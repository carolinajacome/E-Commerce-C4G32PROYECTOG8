import React, { Fragment } from "react";

import logo from '../../logo.png';


const Header = () => {



  const { cartItems } = useSelector(state => state.cart)
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src={logo} className="logo" alt="logo" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Search for products, brands and more"
            />
            <div className="input-group-append">
              <button className="btn" id="search_btn" type="button">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{ textDecoration: 'none' }} >
          <button className="btn" id="login_btn">Login</button>
          <span className="ml-3" id="cart">Cart</span>
          <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
