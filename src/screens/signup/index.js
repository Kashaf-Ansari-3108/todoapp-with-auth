import React, { useState,useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {db} from '../../firebase'
import {collection,doc,setDoc} from "firebase/firestore";
 
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const user = localStorage.getItem("uid");
   const navigate = useNavigate();
  const signupHandler = (e) => {
    e.preventDefault();
    const dbCollection = collection(db, "users");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pwd)
    .then( async (resolve)=>{
      console.log(resolve,"resolve")
      const obj = {
        name,
        email,
        pwd,
        contact,
        country,
        city,
        uid:resolve.user.uid,
      }
      // await addDoc(dbCollection, obj);
      await setDoc(doc(db, "users", resolve.user.uid), obj);
      navigate('/');
    
    })
      
    .catch((err)=>{
      console.log(err,'error')})
  };
  useEffect(() => {
    if (user) {
      navigate("/todo");
    }
  }, []);
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
          <form onSubmit={signupHandler} className="form-login">
            <h2 className="title">Sign Up</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input onChange={(e)=>setName(e.target.value)} type="text" className="input" />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" className="input" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input onChange={(e)=>setPwd(e.target.value)} type="password" className="input" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-phone"></i>
              </div>
              <div className="div">
                <h5>Contact</h5>
                <input onChange={(e)=>setContact(e.target.value)} type="text" className="input" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-globe"></i>
              </div>
              <div className="div">
                <h5>Country</h5>
                <input onChange={(e)=>setCountry(e.target.value)} type="text" className="input" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-city"></i>
              </div>
              <div className="div">
                <h5>City</h5>
                <input onChange={(e)=>setCity(e.target.value)} type="text" className="input" />
              </div>
            </div>

            <input type="submit" className="btn" value="CREATE ACCOUNT" />
            <h5>
            Already have an account? <NavLink to="/">Login</NavLink>{" "}
          </h5>
          </form>
          
        </div>
      </div>
    </>
  );
};

export default Signup;
