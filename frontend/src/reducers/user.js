const userReducer = (state = { user: {}, isAuthenticated: false }, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
        case 'LOGIN_REQUEST':
        case 'LOAD_USER_REQUEST':
        case 'UPDATE_USER_REQUEST':
        case 'UPDATE_PASS_REQUEST':
        case 'RESET_PASSWORD_REQUEST':
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
        case 'LOAD_USER_SUCCESS':
        case 'UPDATE_USER_SUCCESS':
        case 'UPDATE_PASS_SUCCESS':
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case 'RESET_PASSWORD_SUCCESS':
            alert(`Reset link sent successfully to ${action.payload.message}`)
            return {
                loading: false,
                isAuthenticated: false
            }
        case 'LOGOUT_SUCCESS':
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
        case 'LOAD_USER_FAIL':
        case 'UPDATE_USER_FAIL':
        case 'UPDATE_PASS_FAIL':
        case 'RESET_PASSWORD_FAIL':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}
export { userReducer }