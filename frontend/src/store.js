import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productsReducer, productDetailsReducer, newProductReducer, productReducer } from './reducers/productReducers'
import { newOrderReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer
});

let initialState = {}


const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;
