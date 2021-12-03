import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

// Cart Imports
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid my-5">
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={ProductDetails} exact />

          <Route path="cart" component={Cart} exact />
          <Route path="shipping" component={Shipping} exact />

          <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={OrderSuccess} />

        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
