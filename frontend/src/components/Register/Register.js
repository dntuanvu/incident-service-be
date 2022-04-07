import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Login/Login.css';

async function createUser(credentials) {
 return fetch('http://localhost:8080/auth/register', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Register({ setToken }) {
    const history = useHistory();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await createUser({
        username,
        password
      });

      if (token.access_token !== undefined) {
        setToken(token.access_token);
        window.location.reload(true);
      }
    }
  
    return(
      <div className="login-wrapper">
        <h1>Create New Account</h1>
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
          </div>
          <div>
          <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)} />
          </label>
          </div>
          <div>
          <label>
            <p>First Name</p>
            <input type="text" onChange={e => setFirstName(e.target.value)} />
          </label>
          </div>
          <div>
          <label>
            <p>Last Name</p>
            <input type="text" onChange={e => setLastName(e.target.value)} />
          </label>
          </div>
          <div>
          <label>
            <p>Role</p>
            <input type="text" onChange={e => setRole(e.target.value)} />
          </label>
          </div><hr />
          <div>
          <button type="submit" class="btn btn-primary">Submit</button>
          </div><hr />
          <div>
            <button type="submit" class="btn btn-secondary">Back</button>
          </div>
        </form>
      </div>
    )
  }
  
  Register.propTypes = {
    setToken: PropTypes.func.isRequired
  };