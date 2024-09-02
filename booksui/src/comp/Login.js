import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function adduser() {
    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (data.token) {
        const accessToken = data.token.access;
        localStorage.setItem("accessToken", accessToken);
      }

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

    return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Login
      </h2>
      <div style={{ marginBottom: "15px" }}>
        <label
          placeholder="username"
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label
          placeholder="password"
          style={{
            display: "block",
            marginBottom: "5px",
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
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
      </div>
      <button
        onClick={adduser}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#ff6666",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#0056b3")
        }
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Login
      </button>
    </div>
  );
}
