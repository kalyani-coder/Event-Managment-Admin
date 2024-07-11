import React from 'react'
import {Navigate} from "react-router-dom"

const PublicRoute = ({element, restrictedPath = "/quotation"}) => {
    const token = localStorage.getItem("managertoken")
    return token ? <Navigate to={restrictedPath} /> : element;
 
}

export default PublicRoute