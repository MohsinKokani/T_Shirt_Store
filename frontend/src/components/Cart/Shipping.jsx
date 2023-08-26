import React, { useState } from 'react'
import './shipping.css'
import { Country, State, City } from 'country-state-city'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newOrder } from '../../actions/order';
const Shipping = () => {
    const { cart } = useSelector(state => state.cart);
    const { createSuccess } = useSelector(state => state.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('')
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    useEffect(() => {
        if (!cart || cart?.length === 0) return navigate('/cart');
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (createSuccess) {
            alert('Order Place Success fully')
            dispatch(clearErrors())
            return navigate('/products');
        }
        // eslint-disable-next-line
    }, [createSuccess])
    const handlePlaceOrder = () => {
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            size: item.size
        }))
        dispatch(newOrder({
            firstName,
            lastName,
            address,
            city,
            state,
            country,
            pinCode,
            phoneNo,
            orderItems,
            itemsPrice: cart.total,
            paymentInfo: { id: 'dummy', status: 'paid' }
        }))
    }
    return (
        <>
            <div className="shippingContainer">
                <h1>Shipping</h1>
                <p>Please enter your shipping details.</p>
                <hr />
                <div className="form">
                    <div className="fields fields--2">
                        <label className="field">
                            <span className="field__label">
                                First name
                            </span>
                            <input
                                className="field__input"
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label className="field">
                            <span className="field__label">
                                Last name
                            </span>
                            <input
                                className="field__input"
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                    </div>
                    <label className="field">
                        <span className="field__label">
                            Address
                        </span>
                        <input className="field__input" onChange={(e) => setAddress(e.target.value)} type="text" />
                    </label>
                    <label className="field">
                        <span className="field__label">
                            Phone No
                        </span>
                        <input className="field__input" onChange={(e) => setPhoneNo(e.target.value)} type="text" />
                    </label>
                    <label className="field">
                        <span className="field__label">
                            Country
                        </span>
                        <select className="field__input" id="country" onChange={(e) => setCountry(e.target.value)}>
                            <option value="" >Select Country</option>
                            {
                                Country.getAllCountries().map(item => (
                                    <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <div className="fields fields--3">
                        {
                            country &&
                            <label className="field">
                                <span className="field__label">
                                    State
                                </span>
                                <select className="field__input" onChange={(e) => setState(e.target.value)}>
                                    <option value="Select State" />
                                    {
                                        State.getStatesOfCountry(country).map(item => (
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </label>
                        }
                        {
                            state &&
                            <label className="field">
                                <span className="field__label">
                                    City
                                </span>
                                <select className="field__input" onChange={(e) => setCity(e.target.value)}>
                                    <option value="Select City" />
                                    {
                                        City.getCitiesOfState(country, state).map(item => (
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </label>
                        }
                        {
                            city &&
                            <label className="field">
                                <span className="field__label">
                                    Zip code
                                </span>
                                <input className="field__input" onChange={(e) => setPinCode(e.target.value)} type="text" id="zipcode" />
                            </label>
                        }
                    </div>
                </div>
                <hr />
                <button className="button" onClick={() => handlePlaceOrder()}>Place Order</button>
            </div>
        </>
    )
}

export default Shipping