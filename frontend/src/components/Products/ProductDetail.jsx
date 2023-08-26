import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../assets/Loader.gif'
import './productDetail.css'
import { clearErrors, getProductById } from '../../actions/product';
import { useState } from 'react';
import { addToCart } from '../../actions/cart';

const ProductDetail = () => {
    const { id } = useParams();
    const { loading, product, error } = useSelector(state => state.product);
    const { isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuant, setSelectedQuant] = useState(1);

    useEffect(() => {
        dispatch(getProductById(id))
        // eslint-disable-next-line
    }, [id]);
    useEffect(() => {
        if (error) {
            alert(error.data.message);
            dispatch(clearErrors())
        }
        // eslint-disable-next-line
    }, [error]);
    const handleAddToCart = () => {
        if (!isAuthenticated) return navigate(`/login?redirect=products/${id}`);
        if (!selectedSize) return alert("please select size");
        dispatch(addToCart(id, selectedQuant, selectedSize));
    }
    return (
        <>
            {
                !loading && <>
                    <Link to={`/reviews/${id}`} className="reviews">
                        <span>★</span>
                        {product.ratings} &nbsp;({product.reviews?.length} reviews)
                    </Link>
                    <div className="mainDisplay">
                        <div className="imagePort" style={{ backgroundImage: `url(${product.image.url})` }}></div>
                        <div className="prodDetail">
                            <div className="category">{product.category ? product.category : 'For ALL'}</div>
                            <div className="name">{product.Name}</div>
                        </div>
                    </div>
                    <div className="prodDescription">
                        <p>{product.description}</p>
                    </div>
                    <div className="secondDisplay">
                        <div className="product-size">
                            <span>{(product.sizes?.length !== 0) ? 'Sizes' : ''}</span>
                            <div className="size-choose">
                                {
                                    product.sizes?.map(size => {
                                        return (
                                            <div key={size} onClick={() => { setSelectedSize(size) }}>
                                                <input type="radio" id="size" value={size} />
                                                <label>
                                                    <span
                                                        style={{ border: size === selectedSize ? '2px solid #0200ff' : '2px solid white' }}>
                                                        {size}
                                                    </span>
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="product-price quantity">
                            <span>{product.price}$</span>
                            <b className="quantity__minus">
                                <span
                                    onClick={() => { if (selectedQuant <= 1) return; setSelectedQuant(selectedQuant - 1) }}>
                                    -
                                </span>
                            </b>
                            <input name="quantity" type="text" className="quantity__input" readOnly value={selectedQuant} />
                            <b className="quantity__plus">
                                <span
                                    onClick={() => { if (selectedQuant >= product.stock) return; setSelectedQuant(selectedQuant + 1) }}>
                                    +
                                </span>
                            </b>
                        </div>
                        <button className="cart-btn" onClick={() => handleAddToCart()}>Add to cart</button>
                    </div>
                </>
            }
            <div className="bottomLoader">
                {
                    loading &&
                    <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                }
            </div>
        </>
    )
}

export default ProductDetail