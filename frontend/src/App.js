import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

// Admin Imports
import Dashboard from './components/admin/Dashboard'
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProccessOrder from './components/admin/ProccessOrder';
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

import { useSelector } from 'react-redux'

function App() {


  const { user, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid my-5">
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={ProductDetails} exact />
        </div>
        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />

        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />

        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProccessOrder} exact />

        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />

        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />

        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />

        {!loading && user.role !== 'admin' && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
