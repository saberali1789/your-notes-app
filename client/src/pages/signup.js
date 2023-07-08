import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { Login } from "./login";
import { ReactComponent as MainLogo } from '../img/main-logo.svg';

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
     const response = await axios.post("http://localhost:3001/register", {
        email,
        password,
      });
      const userId = response.data.userId
      localStorage.setItem('userId',userId)
      console.log(response);
      // alert('Registeration Completed')
      navigate('/completesign')
    } catch (err) {
      console.error(alert(err));
    }
  };

 


  return (
    <div className="form-container">
      <div className="notes-img">
      <div className="form-logo" >
        <MainLogo className="main-logo"/>
        <h1>Your Notes</h1>
      </div>
        <button>Ar</button>
      </div>
      <div className="form-text">
        <form onSubmit={onSubmit}>
          <h2 className="title-form">Signup</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm password</label>
            <input
        type="password"

       
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
