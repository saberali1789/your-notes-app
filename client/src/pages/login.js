import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import {useCookies} from 'react-cookie'
import axios from "axios";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId)
      const user =localStorage.getItem('userId')
      if(user === response.data.userId){
        navigate('/')
      }
    } catch (err) {
     
      console.error(alert(err));
    }
   
  };


  return (
    <div className="form-container">
      <div className="notes-img"></div>
      <div className="form-text">
        <form onSubmit={onSubmit}>
          <h2 className="title-form">Login</h2>
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
      
          <button className="form-btn" type="submit">
            Login
          </button>
        </form>
        <p>Don't have an account!</p>
        <Link to={"signup"}>Signup </Link>
      </div>
    </div>
  );
};
