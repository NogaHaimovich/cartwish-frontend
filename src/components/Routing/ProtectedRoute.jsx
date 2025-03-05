import React from "react";
import { getUser } from "../../Services/userServices";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const location = useLocation();
    return getUser() ? <Outlet/> : <Navigate to="/login" state={{form: location.pathname}}/>
}

export default ProtectedRoute