import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Profile() {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const [books, setBooks] = useState([]);
  const { user_id } = decodedToken;

  useEffect(() => {
    fetch(`/Books of Customer/${user_id}/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const booksPart = data.split("has ")[1];

        const booksList = booksPart.split(",").map((book) => book.trim());

        setBooks(booksList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(books);
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Profile Information
      </h3>

      <div style={{ marginBottom: "20px", fontSize: "16px" }}>
        <p>
          <strong>Customer ID:</strong> {user_id}
        </p>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#FFF9FA" }}>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Books
            </th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {book}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
