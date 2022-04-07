import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';
import axios from 'axios';

export default function Login({ setToken }) {
    const history = useHistory();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      
      const url = 'http://localhost:8080/auth/login'
      const credentials = { username, password }
      axios.post(url, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        //console.log(response.data);
        //console.log("Login, token=" + JSON.stringify(token))
        if (response.data.access_token !== undefined) {
          setToken(response.data.access_token);
          window.location.reload(true);
        } 
        
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status == 404) {
            console.log(error.response.data.message)
            history.push({
              pathname: '/register',
              state: {  // location state
                register: true, 
              },
            }); 
          }
          //console.log("responseData=" + JSON.stringify(error.response.data));
          //console.log("responseStatus=" + error.response.status);
          //console.log(error.response.headers);
        }
      });
    }

    const registerHandler = () => {
      history.push('/register')
    }
  
    return(
      <div className="login-wrapper">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          </div>
          <div>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          </div><hr />
          <div>
            <button type="submit" class="btn btn-primary">Login</button>
          </div><hr/>
          <div>
            <button type="button" class="btn btn-secondary" onClick={registerHandler}>Register</button>
          </div>
        </form>
      </div>
    )
  }
  
  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };