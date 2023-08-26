const filters = {
    page: 1,
    minPrice: 0,
    maxPrice: 1000,
    searchTerm: '',
    selectedRating: -1,
}
const prodReducer = (state = { products: [], filters, loading: false }, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                loding: false,
                filters: action.payload
            }
        case 'ALL_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true,
                products: []
            }
        case 'ALL_PRODUCT_FAIL':
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload
            }
        case 'ALL_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                stats: action.payload.stats
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return {
                ...state,
                loading: false,
            };

    }
}

const prodDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAILS_SUCCESS':
            return {
                loading: false,
                product: action.payload
            }
        case 'PRODUCT_DETAILS_REQUEST':
            return {
                loading: true,
                product: {}
            }
        case 'PRODUCT_DETAILS_FAIL':
            return {
                loading: false,
                product: {},
                error: action.payload
            }
        default:
            return {
                loading: true,
                ...state,
            };
    }
}
export { prodReducer, prodDetailReducer }