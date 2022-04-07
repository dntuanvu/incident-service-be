import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';

import useToken from './components/App/useToken';
import Navbar from './components/Navbar';

function setToken(userToken) {
  if (userToken !== undefined) {
    sessionStorage.setItem('access_token', JSON.stringify(userToken));
  }
}

function getToken() {
  const tokenString = sessionStorage.getItem('access_token');
  return tokenString
  //const userToken = JSON.parse(tokenString);
  //return userToken?.token
}

function App() {
  const token = getToken();
  //const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <h1>Application</h1>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;