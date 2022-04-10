import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user"))
);

export const incidentService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getAll,
  getById,
  update,
  delete: _delete,

  createIncident,
  assignIncident,
  getAllByAssignee,
  acknowledgeIncident,
  resolveIncident,
};

function createIncident(user) {
  return fetchWrapper.post(`http://localhost:8080/incidents/raise`, user);
}

function assignIncident(body) {
  return fetchWrapper.post(`http://localhost:8080/incidents/assign`, body);
}

function acknowledgeIncident(body) {
  return fetchWrapper.post(`http://localhost:8080/incidents/acknowledge`, body);
}

function resolveIncident(body) {
  return fetchWrapper.post(`http://localhost:8080/incidents/resolve`, body);
}

function getAll() {
  return fetchWrapper.get(`http://localhost:8080/incidents`);
}

function getAllByAssignee(id) {
  return fetchWrapper.get(`http://localhost:8080/incidents/assignee/${id}`);
}

function getById(id) {
  return fetchWrapper.get(`http://localhost:8080/incidents/${id}`);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
      // update local storage
      const user = { ...userSubject.value, ...params };
      localStorage.setItem("user", JSON.stringify(user));

      // publish updated user to subscribers
      userSubject.next(user);
    }
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`http://localhost:8080/incident/${id}`);
}
