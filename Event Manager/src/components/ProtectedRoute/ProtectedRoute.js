import React from 'react';
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({element}) => {

    const token = localStorage.getItem("managertoken");
    return token ? element : <Navigate to={"/"}/>;
 
}

export default ProtectedRoute