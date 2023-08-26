import axios from "axios";
const getProducts = () => {
    return (dispatch) => {
        dispatch({ type: 'ALL_PRODUCT_REQUEST' });
        axios.get(`${process.env.REACT_APP_FETCH_DOMAIN}/tshirt/all`)
            .then(response => {
                dispatch({
                    type: 'ALL_PRODUCT_SUCCESS',
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: 'ALL_PRODUCT_FAIL',
                    payload: error.response
                })
            })
    }
}
const getProductById = (id) => {
    return (dispatch) => {
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });
        axios.get(`${process.env.REACT_APP_FETCH_DOMAIN}/tshirt/byId/${id}`)
            .then(response => {
                dispatch({
                    type: 'PRODUCT_DETAILS_SUCCESS',
                    payload: response.data,
                });
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: 'PRODUCT_DETAILS_FAIL',
                    payload: error.response,
                });
            });

    }
}

const customProdSearch = ({ lt, gt, ratings_gte, page, searchTerm }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'ALL_PRODUCT_REQUEST' });
            const { data } = await axios.get(`${process.env.REACT_APP_FETCH_DOMAIN}/tshirt/search?q=${searchTerm}&lt=${lt}&gt=${gt}&page=${page}&ratings_gte=${ratings_gte}`);
            dispatch({
                type: 'ALL_PRODUCT_SUCCESS',
                payload: data,
            })
        } catch (error) {
            alert(error);
            dispatch({
                type: 'ALL_PRODUCT_FAIL',
                payload: error.message
            })
        }
    }
}
const clearErrors = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR_ERRORS'
        })
    }
}
export { getProducts, clearErrors, getProductById, customProdSearch }