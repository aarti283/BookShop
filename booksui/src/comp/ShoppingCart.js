// ShoppingCart.js
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

//cartContext

const ShoppingCart = () => {
  const {
    buy,
    cartItems,
    removeFromCart,
    plus,
    minus,
    clearCart,
    quantity,
    total_bill,
  } = useContext(CartContext);

  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <div className="outer">
        <div>
          <h2
            style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
          >
            Shopping Cart
          </h2>
          <div className="bill-head mt-3" style={{ textAlign: "center" }}>
            <div>
              <h3>Total Bill: {total_bill}</h3>
            </div>

            <div style={{ marginTop: "20px" }}>
              {total_bill ? (
                <button
                  onClick={clearCart}
                  style={{
                    padding: "10px 20px",
                    margin: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#c82333")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc3545")
                  }
                >
                  Empty the Cart
                </button>
              ) : (
                <button
                  style={{
                    padding: "10px 20px",
                    margin: "10px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#17a2b8",
                    color: "#fff",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#138496")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#17a2b8")
                  }
                >
                  Go to Shopping
                </button>
              )}
              {total_bill ? (
              <Link to="/address" className="link">
              <button
                style={{
                  padding: "10px 20px",
                  margin: "10px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                
              >
                Buy Now
              </button></Link>
              ):(
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "40px" }}>
        <div className="row">
          {cartItems.map((item, ind) => (
            <div key={ind} className="col-md-4 mb-3">
              <Card
                style={{
                  width: "300px",
                  borderRadius: "10px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Img
                  variant="top"
                  style={{ height: "280px",width:"250px", objectFit: "cover" }}
                  src={item.img_url}
                />
                <Card.Body>
                  <Card.Title style={{ fontWeight: "bold", color: "#333" }}>
                    {item.title}
                  </Card.Title>
                  <Card.Text style={{ color: "#777" }}>
                    Some quick example text.
                  </Card.Text>
                  <Card.Text style={{ fontWeight: "bold", color: "#007bff" }}>
                    Rs. {item.price}
                  </Card.Text>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="danger"
                      onClick={() => minus(item.id)}
                      style={{ padding: "5px 15px", borderRadius: "8px" }}
                    >
                      -
                    </Button>
                    <Button
                      variant="primary"
                      style={{ padding: "5px 15px", borderRadius: "8px" }}
                    >
                      {item.quantity}
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => plus(item.id)}
                      style={{ padding: "5px 15px", borderRadius: "8px" }}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    variant="danger"
                    style={{
                      marginTop: "15px",
                      padding: "10px",
                      borderRadius: "8px",
                      width: "100%",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      fontSize: "16px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#c82333")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#dc3545")
                    }
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

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
          Logged in successfully
        </Alert>
      )}
    </>
  );
};

export default ShoppingCart;
