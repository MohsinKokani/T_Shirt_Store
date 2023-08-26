const orderReducer = (state = { orders: [], order: {}, loading: true }, action) => {
    switch (action.type) {
        case 'NEW_ORDER_REQUEST':
        case 'GET_MY_ORDER_REQUEST':
        case 'GET_SINGLE_ORDER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'GET_MY_ORDER_SUCCESS':
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        case 'GET_SINGLE_ORDER_SUCCESS':
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        case 'NEW_ORDER_SUCCESS':
            return {
                loading: false,
                ...state,
                createSuccess: true
            }
        case 'NEW_ORDER_FAIL':
        case 'GET_MY_ORDER_FAIL':
        case 'GET_SINGLE_ORDER_FAIL':
            alert(action.payload.message || action.payload.message || 'error in orders sectoin')
            return {
                loading: false,
                ...state
            }
        case 'CLEAR_ERRORS':
            return {
                loading: false,
                error: null,
                ...state
            }
        default:
            return {
                loading: true,
                ...state,
            };
    }
}
export { orderReducer }