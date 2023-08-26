import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { prodDetailReducer, prodReducer } from "./reducers/product.js";
import { userReducer } from "./reducers/user.js";
import { cartReducer } from "./reducers/cart.js";
import { orderReducer } from "./reducers/order.js";

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducer = combineReducers({
    products: prodReducer,
    product: prodDetailReducer,
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
})
let initialState = {


}
const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;