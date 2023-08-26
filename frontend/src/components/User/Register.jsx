import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './loginRegister.css';
import womenImg from './img/women.png';
import Loader from '../assets/Loader.gif';
import { register } from '../../actions/user';
import { clearErrors } from '../../actions/user';
import previewAvatar from './img/previewAvatar.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone_no, setPhone_no] = useState('')
  const [confirmPass, setConfirmPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const { error, loading, isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (error) {
      alert(error?.message || 'Error while Registring');
      dispatch(clearErrors());
    }
    //eslint-disable-next-line
  }, [error]);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);
  const letsSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Confirm password doesnot match");
      return;
    }
    const userForm = new FormData();
    userForm.set('name', name)
    userForm.set('email', email)
    userForm.set('password', password)
    userForm.set('phone_no', phone_no)
    userForm.set('avatar', avatar)
    dispatch(register(userForm));
  }

  return (
    <div className="wrapper">
      <div className="inner">
        <img src={womenImg} alt="women" className="image-1" />
        <form encType='multipart/form-data' onSubmit={letsSignUp}>
          <h3>New Account?</h3>
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
              onChange={(e) => {
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
                    setAvatar(previewAvatar)
                  }
                }
              }}
            />
          </div>
          <div className="form-holder">
            <i className="fa-regular fa-face-smile"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
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
              onChange={e => {
                setPhone_no(e.target.value);
              }}
            />
          </div>
          <div className="form-holder">
            <i className=" fas fa-key"></i>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
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
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
          </div>
          <button>
            {
              !loading &&
              <span>Register</span>
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

export default Register