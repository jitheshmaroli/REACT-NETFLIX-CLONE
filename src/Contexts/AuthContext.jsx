import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      console.log(currentUser, "this is in authcontext current user")
    });
    return () => unsubscribe; 
  });

  const logout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
        navigate('/');
      })
      .catch(error => {
        console.error('Error loging out:', error);
      })
  }

  const value = {
    currentUser,
    setCurrentUser,
    isLoading,    
    logout
  };


  return (
    <AuthContext.Provider value={ value }>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
