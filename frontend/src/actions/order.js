const newOrder = ({ firstName, lastName, address, city, state, country, pinCode, phoneNo, orderItems, itemsPrice, paymentInfo }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "NEW_ORDER_REQUEST" });
            const body = JSON.stringify({
                shippingInfo: {
                    firstName,
                    lastName,
                    address,
                    city,
                    state,
                    country,
                    pinCode,
                    phoneNo,
                },
                orderItems,
                itemsPrice,
                taxPrice: itemsPrice * 0.18,
                shippingPrice: 40,
                totalPrice: itemsPrice + itemsPrice * 0.18 + 40,
                paymentInfo,
                paidAt: Date.now()
            });
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // Include cookies
                body
            };

            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/order/neworder`, options);
            const data = await response.json();

            dispatch({
                type: 'NEW_ORDER_SUCCESS',
                payload: data,
            });
        } catch (error) {
            alert(error.message || error);
            dispatch({
                type: 'NEW_ORDER_FAIL',
                payload: error.message
            });
        }
    };
};

const getMyOrders = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_MY_ORDER_REQUEST" });

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // Include cookies
            };

            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/order/myOrders`, options);
            const data = await response.json();

            dispatch({
                type: 'GET_MY_ORDER_SUCCESS',
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: 'GET_MY_ORDER_FAIL',
                payload: error.message
            });
        }
    };
};

const getMyOrderWithId = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_SINGLE_ORDER_REQUEST" });

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // Include cookies
            };

            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/order/getbyid/${id}`, options);
            const data = await response.json();

            dispatch({
                type: 'GET_SINGLE_ORDER_SUCCESS',
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: 'GET_SINGLE_ORDER_FAIL',
                payload: error.message
            });
        }
    };
};

const clearErrors = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERRORS'
        });
    };
};

export { newOrder, clearErrors, getMyOrders, getMyOrderWithId };
