import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";

const Show = (prop) => {
  const { item_id } = useParams();
  const [book, setBook] = useState({});
  const { products, searchProducts } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);


  useEffect(() => {
    fetch(`http://localhost:8000/Books/${item_id}/`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(" needs to be added first");
        }
        return response.json();
      })
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        console.error("Error Getting book:", error);
      });
  });

  return (
    <>
      <div className="container mt-5" style={{ width: "800px" }}>
        <div className="row">
          <h3>{book.title}</h3>

          <Card>
            <Card.Img
              style={{ height: "400px", width: "300px" }}
              variant="top"
              src={book.img_url}
            />
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <h3>{book.price}</h3>
              <Button
                onClick={() => addToCart(book)}
                variant="primary"
                className="mt-3"
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <>
        <br />
      </>
    </>
  );
};
export default Show;
