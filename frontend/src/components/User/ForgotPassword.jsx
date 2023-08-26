import React, { useEffect, useState } from 'react';
import './loginRegister.css';
import womenImg from './img/women.png'
import Loader from '../assets/Loader.gif'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPasswordMail } from '../../actions/user.js';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const { error, loading, user } = useSelector(state => state.user);

    const [email, setEmail] = useState('');

    useEffect(() => {
        if (error) {
            alert(error?.message || 'Error while Registring');
            setEmail('')
            dispatch(clearErrors());
        }
        if (user?.success) {
            alert(user?.message || 'Send successfully');
        }
        //eslint-disable-next-line
    }, [error]);

    const getMail = (e) => {
        e.preventDefault();
        dispatch(resetPasswordMail(email));
    }
    return (
        <div className="wrapper">
            <div className="inner">
                <img src={womenImg} alt="women" className="image-1" />
                <form onSubmit={getMail}>
                    <h3>Get Reset Password Mail</h3>
                    <div className="form-holder">
                        <i className="fa-solid fa-envelope"></i>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Registered Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="links-wrapper">
                        <Link to='/register'>Sign Up</Link>
                        <Link to='/login' style={{ color: '#4ba5ff' }}>Login</Link>
                    </div>
                    <button>
                        {
                            !loading &&
                            <span>Send Mail</span>
                        }
                        {
                            loading &&
                            <img src={Loader} alt="Loading" style={{ margin: 'auto', height: '-webkit-fill-available' }} />
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;