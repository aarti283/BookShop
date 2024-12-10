import { jwtDecode } from "jwt-decode";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

// Fetching Profile information using GraphQL API
const GET_BOOKS = gql`
  query {
    customers {
      username
      books {
        title
      }
      addresses {
        city
        state
      }
    }
  }
`;

function Profile() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const { user_id } = decodedToken;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const customer = data.customers[user_id - 1];


  return (
    <div>
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <h3
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          Profile Information
        </h3>

        <h4 style={{ textTransform: "capitalize" }}>
          Name: {customer.username}
        </h4>
        <br/>
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
                Books Purchased
              </th>
            </tr>
          </thead>
          <tbody>
            {customer.books.map((book, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {book.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        
        <tr>
          <th>Address:</th>

          {customer.addresses.map((address, addressIndex) => (
            <td key={addressIndex}>
              {address.city}, {address.state}
            </td>
          ))}
        </tr>
      </div>
    </div>
  );
}

export default Profile;
