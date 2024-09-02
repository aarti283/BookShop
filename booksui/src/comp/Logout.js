import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function Logout() {
    
    function logout() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MzQ3MTc1LCJpYXQiOjE3MjQ3NDcxNzUsImp0aSI6IjZkMmEzYWUxZTU4YTQ5MGJhZGU3MDljNjMwYjQ3MzNmIiwidXNlcl9pZCI6MX0.qQolFrPj6D15mDrPoYjfSIqaEtLB5lMPMaHMhfogxOI'
        
        fetch("/logout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // This tells the server you're sending JSON data
            },       
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("User logged out:", data);
        })
        .catch((error) => {
            console.error("Error adding book:", error);
        });
    }

    return (
        <Button onClick={logout} variant="primary">
        Log OUT
    </Button>
    );
}
