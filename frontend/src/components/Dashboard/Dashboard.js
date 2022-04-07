import React, { useState, useEffect } from 'react';
import useToken from '../App/useToken';

export default function Dashboard() {
    const [listIncident, setListIncident] = useState([]);
    const token = useToken(); 
    

    async function getAllIncidents() {
        console.log("getAllIncidents, token=" + token.token)
        const accessToken = token.token.replace(/['"]+/g, '')
        return fetch('http://localhost:8080/incident/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorisation': `Bearer ${accessToken}`
          }
        })
          .then(data => data.json())
    }

    useEffect(async () => {
        const data = await getAllIncidents()
        console.log("listIncident, data=" + JSON.stringify(data))
    });

    return(
        <h2>Dashboard</h2>
    );
}