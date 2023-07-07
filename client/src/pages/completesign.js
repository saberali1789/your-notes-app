import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

export const CompleteSignup = () => {
const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  
  const navigate = useNavigate()
const userId = localStorage.getItem('userId')
console.log(userId);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3001/register/${userId}`, {
        username,
        phone,
        year
      });
      
      // alert('Registeration Completed')
      navigate('/login')
    } catch (err) {
      console.error(alert(err));
    }
  };

 


  return (
    <div className="form-container">
      <div className="notes-img"></div>
      <div className="form-text">
        <form onSubmit={onSubmit}>
          <h2 className="title-form">Complete Signup</h2>
          <div className="form-group">
            <label >Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
         
          <button className="form-btn" type="submit">
            Complete signup
          </button>
        </form>
        <p>Already have an account!</p>
        <Link to={"login"}>Login </Link>
      </div>
    </div>
  );
};

