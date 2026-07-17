import React from "react";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute = ({ children }) => {


  const user = localStorage.getItem("user");

  const location = useLocation();



  if(!user){

    alert("Please sign in first to use this service.");

    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );

  }



  return children;

};


export default ProtectedRoute;