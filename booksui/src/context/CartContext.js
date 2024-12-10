// CartContext.js
import React, { createContext, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [total_bill, setBill] = useState(0);
  const [quantity, setQuantity] = useState(Array(cartItems).fill(1));
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  let flag = false;
  const toggleShowA = () => setShow(!show);

  const buy = () => {
    setShowAlert(true);
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwtDecode(token);
    const customerId = decodedToken.user_id;
    console.log(customerId);
    const bookData = {
      customer_id: customerId,
      book_ids: books
  };

    fetch("http://localhost:8000/buybook/", {
      method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
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
            console.log("Book Bought:", data);
        })
        .catch((error) => {
            console.error("Error adding book:", error);
        });
  }


  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
    setBooks([...books, product.id]);
    console.log("cart",cartItems);
    console.log("books",books);
    const numberValue = product.price;
    if (total_bill == 0) {
      setBill(numberValue);
    }
    else{
    setBill((prev) => prev + numberValue);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
    cartItems.map(item =>
      item.id === productId ? setBill((prev) => Math.max(0,prev - item.price*item.quantity)) : total_bill
    )
  };

  const clearCart = () => {
    setCartItems([]);
    setBill(0)
  };

  const plus = (productId) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
    cartItems.map(item =>
      item.id === productId ? setBill((prev) => prev + item.price) : total_bill
    )
  };

  const minus = (productId) => {
    setCartItems(cartItems.map(item => {
      if (item.id === productId && item.quantity > 1) {
        
        } 
    }));
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ));
    cartItems.map(item =>
      item.id === productId ? setBill((prev) => Math.max(0,prev - item.price)) : total_bill
    )
    

  };
  
  return (
    <CartContext.Provider
      value={{
        buy,
        cartItems,
        addToCart,
        removeFromCart,
        plus,
        minus,
        clearCart,
        quantity,
        total_bill,
        showAlert,
        setShowAlert
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
