import React from 'react'
import "./Home.css"
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  let navigate  = useNavigate()
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="button-container">
        <button className="create-button" onClick={()=>{navigate('/create')}}  >Create Note</button>
        <button className="update-button" onClick={()=>{navigate('/view')}}>Update Note</button>
        <button className="delete-button" onClick={()=>{navigate('/view')}}>Delete Note</button>
        <button className="view-button" onClick={()=>{navigate('/view')}}>View All Notes</button>
      </div>
    </div>
  );
};