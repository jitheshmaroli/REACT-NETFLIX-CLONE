import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import UserHome from "./Pages/UserHome";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useAuth } from "./Contexts/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Play from "./Pages/Play";


function App() {
  const {currentUser} = useAuth();
  
  
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path='/play' element={currentUser ? <Play /> : <Home />} />
      <Route path="/" element={currentUser ? <UserHome /> : <Home />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
