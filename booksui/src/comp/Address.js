import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { jwtDecode } from "jwt-decode";
import Alert from "@mui/material/Alert";

export default function Address() {
  const { buy, showAlert, setShowAlert } = useContext(CartContext);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [flag, setFlag] = useState("true");
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const { user_id } = decodedToken;

  useEffect(() => {
    fetch(`http://localhost:8000/getadd/${user_id}/`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Address needs to be added first");
        }
        setFlag("false");
        return response.json();
      })
      .then((data) => {
        console.log("Address is:", data);
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  });

  async function adduser() {
    const userAddress = {
      street: street,
      city: city,
      state: state,
      customer: user_id,
    };
    console.log(userAddress);
    try {
      const response = await fetch("http://localhost:8000/Address/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAddress),
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
    buy();
  }

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      {flag == "false" ? (
        <>
          <>
            <button
              onClick={buy}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#ff6666",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Confirm and Buy
            </button>
          </>
          <img src="https://img.freepik.com/free-photo/pnga-stack-books-isolated-white-background_185193-164139.jpg" />
        </>
      ) : (
        <>
          <h2
            style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
          >
            Add Address
          </h2>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
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
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
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
              (e.currentTarget.style.backgroundColor = "#cc0000")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff6666")
            }
          >
            Add Address and Buy Now
          </button>
        </>
      )}

      {showAlert && (
        <Alert
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "450px",
            marginRight: "20px",
            float: "none",
          }}
          variant="filled"
          severity="success"
          onClose={() => setShowAlert(false)}
        >
          Books Purchased successfully
        </Alert>
      )}
    </div>
  );
}
