import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './shipping.css'
import Loader from '../assets/Loader.gif';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMyOrderWithId } from '../../actions/order';
const PrevOrder = () => {
    const { id } = useParams();
    const { loading, order } = useSelector(state => state.orders);
    const { isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getMyOrderWithId(id));
        // eslint-disable-next-line
    }, [])
    if (loading || !order) return (
        <div className="bottomLoader">
            <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
        </div>
    )
    return (
        <>
            {
                !isAuthenticated &&
                !loading &&
                <>
                    <h1 className="quantity" style={{ marginTop: '30vh' }}>Please Login First</h1>
                    <button
                        className="button-1"
                        style={{ display: 'block', margin: 'auto' }}
                        onClick={() => navigate(`/login?redirect=myorders/${id}`)}>
                        Login
                    </button>
                </>
            }
            {
                isAuthenticated &&
                <div className="shopping-cart">
                    {
                        !loading &&
                        isAuthenticated &&
                        order?.orderItems?.length !== 0 &&
                        <>
                            <h3 className='pageTitle'>Thank You for This Order</h3>
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
                        order?.orderItems?.map(item =>
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
                                    >
                                        {order.orderStatus}
                                    </button>
                                </div>
                                <div className="product-line-price">{item.quantity * item.product.price}</div>
                            </div>
                        )
                    }
                    {
                        !loading &&
                        isAuthenticated &&
                        order?.orderItems?.length !== 0 &&
                        <>
                            <div className="totals">
                                <div className="totals-item">
                                    <label>Subtotal</label>
                                    <div className="totals-value" id="cart-subtotal">
                                        {order.itemsPrice}
                                    </div>
                                </div>
                                <div className="totals-item">
                                    <label>Tax (18%)</label>
                                    <div className="totals-value" id="cart-tax">
                                        {parseFloat(order?.taxPrice?.$numberDecimal)?.toFixed(2)}
                                    </div>
                                </div>
                                <div className="totals-item">
                                    <label>Shipping</label>
                                    <div className="totals-value" id="cart-shipping">
                                        {parseFloat(order?.shippingPrice?.$numberDecimal).toFixed(2)}
                                    </div>
                                </div>
                                <div className="totals-item totals-item-total">
                                    <label>Grand Total</label>
                                    <div className="totals-value" id="cart-total">
                                        {parseFloat(order?.totalPrice?.$numberDecimal).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                            <button className="checkout">Raise Query</button>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default PrevOrder