import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsersReducer, userDetailsReducer } from './reducers/userReducer'
import { productsReducer, productDetailsReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer } from './reducers/productReducers'
import { newOrderReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newOrder: newOrderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
});

let initialState = {}


const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;
