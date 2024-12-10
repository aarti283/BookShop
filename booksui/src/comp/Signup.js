
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [budget, setBudget] = useState(0);

  function adduser() {
    const userData = {
      username: username,
      password: password,
      email: email,
      countt: 6,
      budget: budget,
    };

    console.log(userData);
    fetch("http://localhost:8000/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User added:", data);
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  }

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "0 auto",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fdfdfd",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#444" }}>
        Sign Up
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="username"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="password"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="email"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>

      <div style={{ marginBottom: "25px" }}>
        <label
          htmlFor="budget"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Budget in Rs.
        </label>
        <input
          type="number"
          id="budget"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>

      <button
        onClick={adduser}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ff6666",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "##ff6666")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff6666")}
      >
        Sign Up
      </button>
    </div>
  );
}
