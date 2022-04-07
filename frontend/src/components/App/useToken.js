import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('access_token');
    return tokenString
  };
  
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
      if (userToken !== undefined) {
        sessionStorage.setItem('access_token', JSON.stringify(userToken));
        setToken(userToken.access_token);
      }
    };

    return {
        setToken: saveToken,
        token
    }
}