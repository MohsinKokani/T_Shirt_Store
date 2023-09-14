import React, { useEffect } from 'react'
import { clearErrors, getCartItems, removeItem } from '../../actions/cart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loader from '../assets/Loader.gif';
import './cart.css'

const Cart = () => {
    const { loading, cart, error, deleted } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartItems());
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (deleted) dispatch(getCartItems());
        // eslint-disable-next-line
    }, [deleted])
    useEffect(() => {
        if (error?.message) {
            alert(error.message || 'unexpected error in cart page');
            dispatch(clearErrors())
        }
        // eslint-disable-next-line
    }, [error])
    return (
        <>
            {
                loading &&
                <div className="bottomLoader">
                    <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                </div>
            }
            {
                !loading &&
                !isAuthenticated &&
                <>
                    <h1 className="quantity" style={{marginTop:'30vh'}}>Please Login First</h1>
                    <button className="button-1" style={{ display: 'block', margin: 'auto' }}
                        onClick={() => navigate('/login')}>Login</button>
                </>
            }
            <div className="shopping-cart">
                {
                    !loading &&
                    isAuthenticated &&
                    cart?.items?.length !== 0 &&
                    <>
                        <h1>Shopping Cart</h1>
                        <div className="column-labels">
                            <label className="product-image">Image</label>
                            <label className="product-details">Product</label>
                            <label className="productPrice">Price</label>
                            <label className="product-quantity">Quantity</label>
                            <label className="product-removal">Remove</label>
                            <label className="product-line-price">Total</label>
                        </div>
                    </>
                }
                {
                    !loading &&
                    isAuthenticated &&
                    cart?.items?.map(item =>
                        <div className="product" key={item._id}>
                            <div className="product-image">
                                <img src={item.product.image.url} alt='prod' />
                            </div>
                            <div className="product-details">
                                <div className="product-title">{item.product.Name}</div>
                                <p className="product-description">
                                    {item.product.description}
                                </p>
                            </div>
                            <div className="productPrice">{item.product.price}</div>
                            <div className="product-quantity">
                                <input type="number" value={item.quantity} readOnly min={1} />
                            </div>
                            <div className="product-removal">
                                <button
                                    className="remove-product"
                                    onClick={() => {
                                        dispatch(removeItem(item.product._id))
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="product-line-price">{item.quantity * item.product.price}</div>
                        </div>
                    )
                }
                {
                    !loading &&
                    isAuthenticated &&
                    cart?.items?.length !== 0 &&
                    <>
                        <div className="totals">
                            <div className="totals-item">
                                <label>Subtotal</label>
                                <div className="totals-value" id="cart-subtotal">
                                    {cart?.total}
                                </div>
                            </div>
                            <div className="totals-item">
                                <label>Tax (18%)</label>
                                <div className="totals-value" id="cart-tax">
                                    {(cart?.total * 0.18).toFixed(2)}
                                </div>
                            </div>
                            <div className="totals-item">
                                <label>Shipping</label>
                                <div className="totals-value" id="cart-shipping">
                                    40.00
                                </div>
                            </div>
                            <div className="totals-item totals-item-total">
                                <label>Grand Total</label>
                                <div className="totals-value" id="cart-total">
                                    {(cart?.total + 40 + cart?.total * 0.18).toFixed(2)}
                                </div>
                            </div>
                        </div>
                        <button className="checkout" onClick={()=>navigate('/shipping')}>Checkout</button>
                    </>
                }
                {
                    !loading &&
                    cart?.items?.length === 0 &&
                    <h3>Your Cart Is Empty</h3>
                }
            </div>

        </>
    )
}

export default Cart