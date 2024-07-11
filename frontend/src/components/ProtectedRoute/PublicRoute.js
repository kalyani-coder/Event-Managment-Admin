import React from 'react'
import {Navigate } from "react-router-dom"

const PublicRoute = ({element, restrictedPath = "/dashboard" }) => {
    const token = localStorage.getItem("token")
    return token ? <Navigate to={restrictedPath}/> : element;
}

export default PublicRoute