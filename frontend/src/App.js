import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';

import useToken from './components/App/useToken';
import Navbar from './components/Navbar';
import Register from './components/Register/Register';

/*function setToken(userToken) {
  if (userToken !== undefined) {
    sessionStorage.setItem('access_token', JSON.stringify(userToken));
  }
}

function getToken() {
  const tokenString = sessionStorage.getItem('access_token');
  return tokenString
  //const userToken = JSON.parse(tokenString);
  //return userToken?.token
}*/

function App() {
  //const token = getToken();
  const location = useLocation()
  const { token, setToken } = useToken();
  if (location.state.register !== undefined) {
    return <Register setToken={setToken} />
  } else {
    if(!token) {
      return <Login setToken={setToken} />
    }
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <h1>Application</h1>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;