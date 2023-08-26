// import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import f1Image from './img/features/f1.png';
import f2Image from './img/features/f2.png';
import f3Image from './img/features/f3.png';
import f4Image from './img/features/f4.png';
import f5Image from './img/features/f5.png';
import f6Image from './img/features/f6.png';
import characterImage from './img/charcter-removebg-preview.png'

const Home = () => {
    const navigate = useNavigate();
    const startShopping = () => {
        document.querySelector('.mainShopBg').classList.toggle('moveUp');
        document.querySelector('footer').style.bottom = '-50px';
        document.getElementById('feature').style.opacity = '0.2';
        setTimeout(() => {
            navigate('/products');
        }, 1100);
    }
    return (
        <>
            <div className="mainShopBg" >
                <div className="shadeBox">
                    <div className="mainContent">
                        <h1>Make a Statement with Our Shirts</h1>
                        <h3>Wear Your Personality</h3>
                        <button className="button-1" onClick={startShopping}>
                            Shop Now
                        </button>
                    </div>
                    <img src={characterImage} alt="" />
                </div>
            </div>
            <section id="feature" className="section-p1">
                <div className="fe-box">
                    <img src={f1Image} alt="" />
                    <h6 style={{ backgroundColor: "lightgreen" }}>Free Shipping</h6>
                </div>
                <div className="fe-box">
                    <img src={f2Image} alt="" />
                    <h6 style={{ backgroundColor: "yellowgreen" }}>Online Order</h6>
                </div>
                <div className="fe-box">
                    <img src={f3Image} alt="" />
                    <h6 style={{ backgroundColor: "orangered" }}>Save Money</h6>
                </div>
                <div className="fe-box">
                    <img src={f4Image} alt="" />
                    <h6 style={{ backgroundColor: "palevioletred" }}>Promotion</h6>
                </div>
                <div className="fe-box">
                    <img src={f5Image} alt="" />
                    <h6 style={{ backgroundColor: "wheat" }}>Happy Sell</h6>
                </div>
                <div className="fe-box">
                    <img src={f6Image} alt="" />
                    <h6 style={{ backgroundColor: "goldenrod" }}>24/7 Support</h6>
                </div>
            </section>
            <footer>Made with love by Mohsin</footer>
        </>
    )
}

export default Home