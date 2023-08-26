import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearErrors } from '../../actions/product'
import { login } from '../../actions/user'
import womenImg from './img/women.png'
import Loader from '../assets/Loader.gif'
import './loginRegister.css'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, loading, isAuthenticated } = useSelector(state => state.user);

    useEffect(() => {
        if (error) {
            alert(JSON.stringify(error));
            // alert(error?.message||'something went wrong...');
            dispatch(clearErrors());
        }
        //eslint-disable-next-line
    }, [error])
    useEffect(() => {
        const redirect = location.search ? location.search.split('=')[1] : 'products';
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }
        //eslint-disable-next-line
    }, [isAuthenticated]);

    const letsLogin = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    return (
        <div className="wrapper">
            <div className="inner">
                <img src={womenImg} alt="women" className="image-1" />
                <form onSubmit={letsLogin}>
                    <h3>Sign In</h3>
                    <div className="form-holder">
                        <i className="fa-solid fa-envelope"></i>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-holder">
                        <i className="fas fa-key"></i>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="links-wrapper">
                        <Link to='/register'>Sign Up</Link>
                        <Link to='/forgotpassword' style={{ color: '#4ba5ff' }}>Forgot Password</Link>
                    </div>
                    <button>
                        {
                            !loading &&
                            <span>Sign In</span>
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

export default Login