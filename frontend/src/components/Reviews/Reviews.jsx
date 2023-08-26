import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Reviews.css';

import Loader from '../assets/Loader.gif'
import { useEffect } from 'react';
import { clearErrors, getProductById } from '../../actions/product';

const Reviews = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product, error } = useSelector(state => state.product);
    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(clearErrors());
        }
        dispatch(getProductById(id));
    }, [dispatch, error, id])
    return (<>
        {
            loading &&
            <div className="bottomLoader">
                {
                    loading &&
                    <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                }
            </div>
        }
        {
            !loading &&
            !product.reviews?.[0] &&
            <h1>No Reviews</h1>
        }
        {
            !loading &&
            <div className="reviewsContainer">
                {
                    product.reviews?.map((review, idx) => {
                        return (
                            <div className="review" key={idx}>
                                <div className="star">{review.rating} ★</div>
                                <div className="comment">
                                    {review.comment}
                                </div>
                                <div className="reviewer">
                                    by <span>{review.name}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        }
    </>)
}

export default Reviews