const cartReducer = (state = { cart: [], loading: false }, action) => {
    switch (action.type) {
        case 'GET_CART_ITEM_REQUEST':
        case 'ADD_TO_CART_REQUEST':
        case 'REMOVE_ITEM_REQUEST':
            return {
                loading: true,
                cart: []
            }
        case 'GET_CART_ITEM_SUCCESS':
        case 'ADD_TO_CART_SUCCESS':
            return {
                ...state,
                loading: false,
                cart: action.payload
            }
        case 'REMOVE_ITEM_SUCCESS':
            return {
                ...state,
                loading: true,
                deleted: true,
            }
        case 'GET_CART_ITEM_FAIL':
        case 'ADD_TO_CART_FAIL':
        case 'REMOVE_ITEM_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload.data
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state
    }
}
export { cartReducer }