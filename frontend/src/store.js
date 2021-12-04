import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productsReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from "./reducers/cartReducers"; 
import {newOrderReducer} from './reducers/newOrdersReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,

    cart: cartReducer,
    newOrder: newOrderReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}


const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;
