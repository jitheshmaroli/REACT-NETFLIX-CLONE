import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react'
import Stack from "react-bootstrap/Stack";
import {auth} from '../../Firebase';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import logo from '../../assets/logo.png'
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';


const NavBar = () => {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useAuth();

  useEffect(() => {
    console.log('this is current user:', currentUser)
  })

  const handleLogin = () => {
    navigate('/login');
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };
  return (
    <Stack direction="horizontal" className='stack-custom' style={currentUser? {position:'fixed'} :{position:'absolute'}  }  gap={3} >
      <div className="p-2">
        <img 
          src={logo} 
          alt="NETFLIX LOGO"
          className='logo'
        />
      </div>
      {currentUser? 
      <>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/series" className="nav-link">Series</Link>
          <Link to="/movies" className="nav-link">Movies</Link>
          <Link to="/liked" className="nav-link">Liked Videos</Link>
        </div>
        <div className="p-2 ms-auto btn-signin ">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </>
      :
      <>
      <div className="p-2 ms-auto">
            <DropdownButton id="dropdown-basic-button" title="English">
                <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Hindi</Dropdown.Item>
            </DropdownButton>
      </div>
      <div className="p-2 btn-signin ">
        <button 
            className='my-btn'
            onClick={handleLogin}
        >
            Sign In
        </button>
      </div>
      </>
      }
    </Stack>
  )
}

export default NavBar