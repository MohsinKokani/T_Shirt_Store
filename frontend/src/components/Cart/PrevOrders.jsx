import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './shipping.css'
import Loader from '../assets/Loader.gif';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../../actions/order';
import { Link } from 'react-router-dom';
import './prevOrders.css'
const PrevOrders = () => {
    const { loading, orders } = useSelector(state => state.orders);
    const { isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getMyOrders());
        // eslint-disable-next-line
    }, [])
    if (loading) return (
        <div className="bottomLoader">
            <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
        </div>
    )

    return (
        <>
            {
                !isAuthenticated &&
                <>
                    <h1 className="quantity" style={{ marginTop: '30vh' }}>Please Login First</h1>
                    <button className="button-1" style={{ display: 'block', margin: 'auto' }}
                        onClick={() => navigate('/login?redirect=myorders')}>Login</button>

                </>
            }
            {
                isAuthenticated &&
                orders?.length === 0 &&
                <>
                    <h1 className="quantity" style={{ marginTop: '30vh' }}>Make Your First Order</h1>
                    <button className="button-1" style={{ display: 'block', margin: 'auto' }}
                        onClick={() => navigate('/products')}>Products</button>
                </>
            }
            {
                isAuthenticated &&
                orders?.length !== 0 &&
                <>
                    <h1 className="pageTitle">Your Orders</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Order Date</th>
                                <th>Delivery Status</th>
                                <th>Order ID</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        {
                            orders?.map(order => (
                                <tbody key={order._id}>
                                    <tr>
                                        <td>{order.createdAt}</td>
                                        <td>{order.orderStatus}</td>
                                        <td><Link to={`/myorders/${order._id}`}>{order._id}</Link></td>
                                        <td>Rs{parseFloat(order.totalPrice.$numberDecimal)?.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </>
            }


        </>
    )
}

export default PrevOrders