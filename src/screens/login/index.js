import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const user = localStorage.getItem("uid");
   const navigate = useNavigate();

   useEffect(() => {
    if (user) {
      navigate("/todo");
    }
  }, []);
  const signinHandler = (e) => {
    e.preventDefault();
    console.log("Login Success");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pwd)
      .then((resolve) => {
        console.log(resolve);
        localStorage.setItem("uid", resolve.user.uid);
        navigate("/todo");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const inputs = document.querySelectorAll(".input");

  function addCl() {
    let par = this.parentNode.parentNode;
    par.classList.add("focus");
  }

  function remC1() {
    let par = this.parentNode.parentNode;
    if (this.value == "") par.classList.remove("focus");
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addCl);
    input.addEventListener("blur", remC1);
  });
  return (
    <>
      <img src="https://i.ibb.co/XWdPc2X/wave-01.png" className="wave" />
      <div className="container">
        <div className="img">
          <img src="https://i.ibb.co/JvXP8rW/phone.png" />
        </div>
        <div className="login-content">
          <form onSubmit={signinHandler} className="form-login">
            <img src="https://i.ibb.co/H4f3Hkv/profile.png" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="input"
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  onChange={(e) => setPwd(e.target.value)}
                  type="password"
                  className="input"
                />
              </div>
            </div>
            <input type="submit" className="btn" value="Login" />
            <h5>
              Don't have an account? <NavLink to="/signup"> Sign Up</NavLink>
            </h5>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
