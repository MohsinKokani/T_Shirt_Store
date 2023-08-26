import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './loginRegister.css';
import './profile.css';
import flowerPng from '../assets/flower.png';
import Loader from '../assets/Loader.gif';
import { Link } from 'react-router-dom';
import previewAvatar from './img/previewAvatar.png';
import { useEffect } from 'react';
import { clearErrors, updatePassword, updateUser } from '../../actions/user.js'
const Profile = () => {
    const { user, loading, isAuthenticated, error } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [option, setOption] = useState(1)

    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [phoneNo, setPhoneNo] = useState(user?.phone_no || '')
    const [avatar, setAvatar] = useState('')
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [confirmPass, setConfirmPassword] = useState('')
    useEffect(() => {
        if (!isAuthenticated) return;
        setName(user?.name);
        setEmail(user?.email);
        setPhoneNo(user?.phone_no);
        //eslint-disable-next-line
    }, [isAuthenticated]);
    useEffect(() => {
        if (error) {
            alert(error?.message || 'Error while Registring');
            dispatch(clearErrors());
        }
        //eslint-disable-next-line
    }, [error]);
    function handleFileInput(e) {
        if (e.target.name === "avatar") {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setAvatar(reader.result);
                    }
                };
            } else {
                setAvatar('')
            }
        }
    }
    function changeUserDetails(e) {
        e.preventDefault();
        const userForm = new FormData();
        userForm.set("name", name);
        userForm.set("email", email);
        userForm.set("phoneNo", phoneNo);
        userForm.set("avatar", avatar);
        dispatch(updateUser(userForm));
        setEdit(false);
    }
    function changePassword() {
        if (password !== confirmPass) {
            alert('Password do not match');
            return;
        }
        dispatch(updatePassword(oldPassword, password, confirmPass));
        setOldPassword('')
        setPassword('')
        setConfirmPassword('')
    }
    return (
        <>
            <div className="profileContainer">
                <div className="wrapper" style={{ minHeight: 'unset', margin: '1rem' }}>
                    <div className="l-wrapper">
                        <div className="userDisplay v-centered">
                            {
                                loading ?
                                    <img src={Loader} alt="Loading" style={{ margin: 'auto', height: '-webkit-fill-available', aspectRatio: 1 }} />
                                    :
                                    <img src={user?.avatar?.url ? user?.avatar.url : previewAvatar} alt="userimg" />
                            }
                            <h3>{user?.name}</h3>
                        </div>
                        <div className="navigations v-centered">
                            <Link to=''
                                className={option === 1 ? 'activeNavLink' : ''}
                                onClick={() => setOption(1)}>
                                <i className='fa-solid fa-house'></i>
                                Account
                            </Link>
                            <Link to=''
                                className={option === 2 ? 'activeNavLink' : ''}
                                onClick={() => setOption(2)}>
                                <i className='fa-solid fa-key'></i>
                                Password
                            </Link>
                        </div>
                    </div>

                    {
                        option === 1 &&
                        <div className="inner" id='Account'>
                            <form encType='multipart/form-data' onSubmit={(e) => { e.preventDefault() }}>
                                <h3>New Account?</h3>
                                {
                                    edit &&
                                    <div className="form-holder">
                                        <i>
                                            <img src={avatar || previewAvatar} alt="avatar" className="avatarImg" style={{ width: '20px' }} />
                                        </i>
                                        <input
                                            type="file"
                                            id="avatar"
                                            name='avatar'
                                            accept='image/*'
                                            className="form-control"
                                            onChange={handleFileInput}
                                        />
                                    </div>
                                }
                                <div className="form-holder">
                                    <i className="fa-regular fa-face-smile"></i>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        readOnly={!edit}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-holder">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-holder">
                                    <i className="fas fa-phone"></i>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Phone Number"
                                        value={phoneNo}
                                        onChange={(e) => {
                                            setPhoneNo(e.target.value);
                                        }}
                                    />
                                </div>
                                {
                                    !edit &&
                                    <button onClick={() => { setEdit(true) }}>
                                        {
                                            !loading &&
                                            <span >Update</span>
                                        }
                                        {
                                            loading &&
                                            <img src={Loader} alt="Loading" style={{ margin: 'auto', height: '-webkit-fill-available' }} />
                                        }
                                    </button>
                                }
                                {
                                    edit &&
                                    <>
                                        <button onClick={changeUserDetails}>
                                            <span >Submit</span>
                                        </button>
                                        <button
                                            style={{ backgroundColor: '#eee', color: 'black' }}
                                            onClick={() => { setEdit(false) }}
                                        >
                                            <span >Cancel</span>
                                        </button>
                                    </>
                                }
                            </form>
                        </div>
                    }
                    {
                        option === 2 &&
                        <div className="inner" id='Password'>
                            <form onSubmit={(e) => { e.preventDefault() }}>
                                <h3>Change Password</h3>
                                <div className="form-holder">
                                    <i className=" fas fa-key"></i>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Old Password"
                                        value={oldPassword}
                                        onChange={(e) => {
                                            setOldPassword(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-holder">
                                    <i className=" fas fa-key"></i>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-holder">
                                    <i className=" fas fa-check"></i>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={confirmPass}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }}
                                    />
                                </div>
                                <button onClick={() => { changePassword() }}>
                                    {
                                        !loading &&
                                        <span>Change Password</span>
                                    }
                                </button>
                            </form>
                        </div>
                    }

                    <img src={flowerPng} alt="women" className="image-2" />
                </div>
            </div>
        </>
    )
}

export default Profile