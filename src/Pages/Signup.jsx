import React, { useState } from "react";
import {auth} from '../Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import  "./Login.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/userHome");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="login-background"> 
    <div className="login-container">
      <h2>Signup</h2>
      <form className="login-form" onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
          Already have an account?{" "}
          <Link to="/login" className="signup-link">Login</Link>
        </p>
    </div>
    </div>
  );
};

export default Signup;
