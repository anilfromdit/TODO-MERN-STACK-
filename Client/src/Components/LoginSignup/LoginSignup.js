import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../Loader/Loader";
import axios from 'axios'
import MailIcon from "@mui/icons-material/MailRounded";
import LockIcon from "@mui/icons-material/LockRounded";
import FaceIcon from "@mui/icons-material/Face";

const LoginSignUp = () => {


  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    username: ""
  });
  const { name, email, password, username } = user;

  const [loading, setLoading] = useState(false)

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const config = { headers: { "Content-Type": "application/json" } };
    await axios.post(
      `/api/login`,
      { email: loginEmail, password: loginPassword },
      config
    ).then((res) => { setLoggedIn(true) })
      .catch((err) => { setLoggedIn(false); console.log(err) })
    setLoading(false)

  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const config = { headers: { "Content-Type": "application/json" } };
    await axios.post(
      `/api/signup`,
      { name, email, password, username },
      config
    ).then((res) => { setLoggedIn(true) })
      .catch((err) => { setLoggedIn(false); console.log(err) })
    setLoading(false)
  };

  useEffect(() => {


    loggedIn && (window.location.href = `/`);

  }, [loggedIn]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const registerDataChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value });

  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form ref={loginTab} className="loginForm" onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart-form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpContactNumber signUpEmail">
                  <FaceIcon />
                  <input
                    type="text"
                    required
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>


                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
