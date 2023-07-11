import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ReactComponent as MainLogo } from "../img/main-logo.svg";

export const Login = ({ toggleRtl, lang }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://your-notes-app-2ppx.onrender.com/login", {
        email,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      const user = localStorage.getItem("userId");
      if (user === response.data.userId) {
        navigate("/");
         window.localStorage.setItem("userName", response.data.user.username);
      }
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
            <h2 className="title-form">{lang ? "Login" : "تسجيل دخول "} </h2>
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

            <button className="form-btn" type="submit">
              {lang ? " Login" : " تسجيل دخول "}
            </button>
          </form>
          <p>
            {lang ? " Don't have an account!  " : "  تمتلك حساب بالفعل "}{" "}      
            <span>
              <Link to={"/signup"}>{lang ? "Signup" : "  تسجيل الدخول "} </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
