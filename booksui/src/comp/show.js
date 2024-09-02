import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";

const Show = (prop) => {
  const { item_id } = useParams();
  const { products, searchProducts } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  console.log("item", products[item_id - 1].title);
  return (
    <>
      <div className="container mt-5" style={{  width: "800px" }}>
        <div className="row">
        <h3>{products[item_id].title}</h3>
            
          <Card>
            <Card.Img
              style={{ height: "400px", width: "300px" }}
              variant="top"
              src={products[item_id - 1].img_url}
            />
            <Card.Body>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <h3>{products[item_id - 1].price}</h3>
              <Button
                onClick={() => addToCart(products[item_id - 1])}
                variant="primary" className="mt-3">
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
