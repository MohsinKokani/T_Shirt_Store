import React from 'react'
import { Link } from 'react-router-dom';
import f1png from '../Home/img/features/f1.png';
const Product = ({ product }) => {
    return (
        <Link className="pro" key={product._id} to={product._id}>
            <img src={product.image.url || f1png} alt="Product" />
            <div className="des" style={{ textAlign: 'start', paddingLeft: '12px' }}>
                <span>{product.Name}</span>
                <h4>{product.category || 'Not Categorized'}</h4>
                <div className="star">
                    {product.ratings}&nbsp;★
                </div>
                <h4 style={{ color: '#05c73f' }}>{product.price}RS</h4>
            </div>
            <span href="/" className="cart">
                pickUp
            </span>
        </Link>
    )
}
export default Product