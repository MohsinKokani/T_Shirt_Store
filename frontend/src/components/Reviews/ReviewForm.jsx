import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../assets/Loader.gif'
import './reviewForm.css'

const ReviewForm = ({ productId }) => {

    const { user } = useSelector(state => state.user);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReviewSumbit = async (e) => {
        e.preventDefault();
        if (comment.length <= 3 || loading) return;
        const body = {
            rating,
            comment,
            productId
        }
        try {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // To include cookies
                body: JSON.stringify(body)
            };
            setLoading(true);
            let response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/tshirt/addReview`, options)
            response = await response.json();
            setLoading(false);
            if (response.success) alert(response.message || 'Adding Review Successfull')
            else alert(response.message || 'something went wrong while adding the review')
        } catch (error) {
            alert(error.message || 'something went wrong while adding the review.')
            console.log(error);
        }
    }
    return (
        <>
            <div
                id="myModal"
                className="modal"
                onClick={() => {
                    var modal = document.getElementById("myModal");
                    modal.style.display = "none";
                }}
            >
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <span
                        className="close"
                        onClick={(event) => {
                            var modal = document.getElementById("myModal");
                            modal.style.display = "none";
                        }}
                    >
                        &times;
                    </span>
                    <script src="https://use.fontawesome.com/a6f0361695.js"></script>

                    <form id="myModal" onSubmit={() => { }}>
                        <div className="pinfo">Your personal info</div>

                        <div className="review-form-group">
                            <div className="col-md-4 inputGroupContainer">
                                <div className="review-input-group">
                                    <span className="review-input-group-addon"><i className="fa fa-user"></i></span>
                                    <input name="name" value={user?.name} readOnly className="review-form-control" type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="pinfo">Rate our overall services.</div>
                        <div className="review-form-group">
                            <div className="col-md-4 inputGroupContainer">
                                <div className="review-input-group">
                                    <span className="review-input-group-addon"><i className="fa fa-heart"></i></span>
                                    <select
                                        className="review-form-control"
                                        id="rate"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value='5'>5</option>
                                        <option value='4'>4</option>
                                        <option value='3'>3</option>
                                        <option value='2'>2</option>
                                        <option value='1'>1</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pinfo">Write your feedback.</div>
                        <div className="review-form-group">
                            <div className="col-md-4 inputGroupContainer">
                                <div className="review-input-group">
                                    <span className="review-input-group-addon"><i className="fa fa-pencil"></i></span>
                                    <textarea
                                        className="review-form-control"
                                        id="review"
                                        rows="3"
                                        value={comment}
                                        onChange={(e) => { setComment(e.target.value) }}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ backgroundColor: comment.length > 3 ? '#0275d8' : '#8a8e91' }}
                            onClick={handleReviewSumbit}
                        >
                            {
                                !loading &&
                                <span>Submit</span>
                            }
                            {
                                loading &&
                                <img src={Loader} alt="Loading" style={{ margin: 'auto', height: '-webkit-fill-available', width: '70%' }} />
                            }
                        </button>

                    </form>
                </div>

            </div>
        </>
    )
}

export default ReviewForm