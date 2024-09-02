import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductList from "./comp/ProductList";
import ShoppingCart from "./comp/ShoppingCart";
import Show from "./comp/show";
function Routing() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProductList searchQuery={searchQuery} />}
        ></Route>
        <Route path="/cart" element={<ShoppingCart />}></Route>
        <Route path="/show/:item_id" element={<Show />}></Route>
      </Routes>
    </Router>
  );
}

export default Routing;
