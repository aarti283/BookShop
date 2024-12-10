import { useState } from "react";

export default function Addbook() {
  const [title, setTitle] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  function addbook() {
    const bookData = {
      title: title,
      price: price,
      quantity: quantity,
      img_url: imgurl,
    };
    console.log(bookData);
    fetch("http://localhost:8000/Books/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Book added:", data);
        // Optionally, reset form fields after submission
        setTitle("");
        setImgurl("");
        setPrice(0);
        setQuantity(0);
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
        Add New Book
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="title"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          htmlFor="imgurl"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Book Image URL
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              padding: "12px",
              backgroundColor: "#f1f1f1",
              borderRight: "1px solid #ccc",
            }}
          >
            Image
          </span>
          <input
            type="text"
            id="imgurl"
            value={imgurl}
            onChange={(e) => setImgurl(e.target.value)}
            style={{
              flex: "1",
              padding: "12px",
              border: "none",
              fontSize: "16px",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) =>
              (e.target.parentElement.style.borderColor = "#007bff")
            }
            onBlur={(e) => (e.target.parentElement.style.borderColor = "#ccc")}
          />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="price"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Price in Rs.
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
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
          htmlFor="quantity"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
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
        onClick={addbook}
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
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
      >
        Add Book
      </button>
    </div>
  );
}
