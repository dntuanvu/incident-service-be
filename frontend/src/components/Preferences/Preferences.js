import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Preferences() {
  const history = useHistory()
  
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    //window.location.href('/')
    window.location.reload(true);
  })

  return(
    <h2>Logout</h2>
  );
}