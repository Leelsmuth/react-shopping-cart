import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import useLocalStorage from "./hooks/useLocalStorage";

//Context
import { ProductContext } from "./contexts/ProductContext.js";
import { CartContext } from "./contexts/CartContext.js";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage("Cart", []);

  const addItem = item => {
    setCart([...cart, item]);
  };

  const removeItem = remItem => {
    const items = cart.filter(item => {
      return item.id !== remItem;
    });
    setCart([...items]);
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route exact path="/cart" component={ShoppingCart} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
