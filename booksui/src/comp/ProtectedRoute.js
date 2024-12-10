
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Profile from "./Profile";
import Login from "./Login";


export default function ProtectedRoute(props) {
    const token = localStorage.getItem("accessToken");
    if (token){
        return <Profile/>
    }
    else{
        return <Login settoken ={props.settoken}/>
    }

   
}
