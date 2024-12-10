import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProductContextProvider, {
  ProductContext,
} from "./context/ProductContext";
import CartContextProvider from "./context/CartContext";
import ProductList from "./comp/ProductList";
import ShoppingCart from "./comp/ShoppingCart";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import Show from "./comp/show";
import Addbook from "./comp/Addbook";
import Signup from "./comp/Signup";
import Login from "./comp/Login";
import Logout from "./comp/Logout";
import Profile from "./comp/Profile";
import Address from "./comp/Address";
import ProtectedRoute from "./comp/ProtectedRoute";

function App() {
 
  const tok = localStorage.getItem("accessToken");
  const [token, setToken] = useState(tok)
  const [searchQuery, setSearchQuery] = useState("");
  const searchProducts = useContext(ProductContext);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  
  return (
    <>
      <Router>
        <ProductContextProvider>
          <CartContextProvider>
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container className="space">
                <Navbar.Brand href="#home">
                  <Link to="/" className="link">
                    <h2>Book Store</h2>
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link>
                      <Link to="/cart" className="link">
                        Cart
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/add" className="link">
                        Add_Book
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/signup" className="link">
                        Signup
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/login/" className="link">
                        Login
                      </Link>
                    </Nav.Link>
                    {/* <Nav.Link ><Link to="/logout" className="link">Logout</Link></Nav.Link> */}
                    <Nav.Link>
                      <Link to="/profile" className="link">
                        Profile
                      </Link>
                    </Nav.Link>
                    

                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className=" mr-sm-2"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                   
                  </Nav>
                </Navbar.Collapse>
               { token &&
                <Logout settoken ={setToken}/>
                }
              </Container>
            </Navbar>
            <Routes>
              <Route
                path="/"
                element={<ProductList searchQuery={searchQuery} />}
              ></Route>
              <Route path="/cart" element={<ShoppingCart />}></Route>
              <Route path="/add" element={<Addbook />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login settoken ={setToken}/>}></Route>
              <Route path="/profile" element={<ProtectedRoute settoken ={setToken}/>}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/address" element={<Address />}></Route>
              <Route path="/show/:item_id" element={<Show />}></Route>
            </Routes>
          </CartContextProvider>
        </ProductContextProvider>
      </Router>
    </>
  );
}

export default App;
