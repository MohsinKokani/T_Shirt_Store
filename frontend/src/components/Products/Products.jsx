import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import store from '../../store.js';
import './style.css';
import Product from './Product';
import Loader from '../assets/Loader.gif';
import { clearErrors } from '../../actions/product';
import NavFilter from './NavFilter.jsx';

const Products = () => {
    const dispatch = useDispatch();
    const { loading, error, products, stats, filters } = useSelector(state => state.products);

    useEffect(() => {
        document.querySelector('.pro-container').style.opacity = '1';
        const handleKeyDown = (event) => {//alt+L
            if (event.altKey && event.keyCode === 76) {
                document.querySelector('.search-group>input').focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (error) {
            alert(error.data?.message || 'something went wrong in products');
            dispatch(clearErrors())
        }
        // eslint-disable-next-line
    }, [error]);

    return (
        <>
            <NavFilter />
            <div className="pro-container">
                {
                    !loading &&
                    products?.map(product =>
                        <Product key={product._id} product={product} />
                    )
                }
                {
                    !loading &&
                    <div className="prevNext">
                        <i
                            className="fa-solid fa-circle-arrow-left prev"
                            onClick={() => {
                                store.dispatch({
                                    type: 'UPDATE_FILTERS',
                                    payload: {
                                        ...filters,
                                        page: filters.page - 1
                                    }
                                })
                            }}
                            style={{ visibility: filters?.page <= 1 ? 'hidden' : 'visible' }}
                        ></i>
                        <i
                            className="fa-solid fa-circle-arrow-right next"
                            onClick={() => {
                                store.dispatch({
                                    type: 'UPDATE_FILTERS',
                                    payload: {
                                        ...filters,
                                        page: filters.page + 1
                                    }
                                })
                            }}
                            style={{ visibility: filters?.page < Math.ceil(stats?.productsCount / stats?.prodPerPage) ? 'visible' : 'hidden' }}
                        ></i>
                    </div>
                }
                <div className="bottomLoader">
                    {
                        loading &&
                        <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                    }
                </div>
            </div>
        </>
    )
}

export default Products