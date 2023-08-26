const addToCart = (product, quantity, size) => {
    return (dispatch) => {
        dispatch({ type: 'ADD_TO_CART_REQUEST' });
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // Include cookies
            body: JSON.stringify({ product, quantity, size })
        };
        
        fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/cart/add`, options)
            .then(response => response.json())
            .then(data => {
                alert("added to cart");
                dispatch({
                    type: 'ADD_TO_CART_SUCCESS',
                    payload: data,
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: 'ADD_TO_CART_FAIL',
                    payload: error,
                });
            });
    };
};

const getCartItems = () => {
    return (dispatch) => {
        dispatch({ type: 'GET_CART_ITEM_REQUEST' });
        
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // Include cookies
        };
        
        fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/cart/all`, options)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'GET_CART_ITEM_SUCCESS',
                    payload: data,
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: 'GET_CART_ITEM_FAIL',
                    payload: error,
                });
            });
    };
};

const removeItem = (product) => {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_ITEM_REQUEST' });
        
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // Include cookies
        };
        
        fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/cart/remove/${product}`, options)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'REMOVE_ITEM_SUCCESS',
                    payload: data,
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: 'REMOVE_ITEM_FAIL',
                    payload: error,
                });
            });
    };
};

const clearErrors = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERRORS'
        });
    };
};

export { addToCart, getCartItems, clearErrors, removeItem };
