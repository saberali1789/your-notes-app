import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Login } from "./login";
import { ReactComponent as MainLogo } from "../img/main-logo.svg";

export const Signup = ({ toggleRtl, lang }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://your-notes-app-2ppx.onrender.com/register", {
        email,
        password,
      });
      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
      console.log(response);
      alert("Registeration Completed");
      navigate("/completesign");
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
            <h2 className="title-form">{lang ? "Signup" : " إنشاء حساب "}</h2>
            <div className="form-group">
              <label htmlFor="email">{lang ? "Email" : " الحساب "}</label>
              <input
                className="input"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                {lang ? "Password" : " الرقم السري "}
              </label>
              <input
                className="input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>{lang ? "Confirm password" : " تأكيد الرقم السري "}</label>
              <input className="input" type="password" />
            </div>
            <button className="form-btn" type="submit">
              {lang ? "Complete signup" : " إكمال انشاء الحساب "}
            </button>
          </form>
          <p>{lang ? "Already have an account!" : " تمتلك حساب بالفعل! "}</p>
          <span>
            <Link to={"/login"}>{lang ? "Login" : " تسجيل الدخول "} </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
