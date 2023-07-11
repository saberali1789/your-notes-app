import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { ReactComponent as MainLogo } from "../img/main-logo.svg";


export const CompleteSignup = ({ toggleRtl, lang}) => {
const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  
  const navigate = useNavigate()
const userId = localStorage.getItem('userId')
console.log(userId);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`https://your-notes-app-2ppx.onrender.com/register/${userId}`, {
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
      <div className="form-box">
        <div className="notes-img">
          <div className="form-logo">
            <MainLogo className="main-logo" />
            <h1>Your Notes</h1>
          </div>
          <button className="lang-btn" onClick={toggleRtl}>
            {lang ? "Ar" : " En "}
          </button>
        </div>
        <div className="form-text">
          <form className="form" onSubmit={onSubmit}>
            <h2 className="title-form">
              {lang ? "Complete Signup" : " إكمال انشاء حساب "}
            </h2>
            <div className="form-group">
              <label>{lang ? "Username" : " اسم المستخدم "}</label>
              <input
                className="input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{lang ? "Phone" : " رقم الهاتف "}</label>
              <input
                className="input"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">{lang ? "Year" : " سنة الميلاد "}</label>
              <input
                className="input"
                type="text"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <button className="form-btn" type="submit">
              {lang ? "Complete signup" : " إكمال انشاء حساب "}
            </button>
          </form>
          <p>
            {lang ? "Already have an account!" : " تمتلك حساب بالفعل "}{" "}
            <span>
              <Link to={"/login"}>{lang ? "Login" : " تسجيل الدخول "} </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

