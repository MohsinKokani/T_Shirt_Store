import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import f1png from '../Home/img/features/f1.png';
import previewAvatar from '../User/img/previewAvatar.png';

import { logout } from '../../actions/user.js';
import { customProdSearch } from '../../actions/product';
import { getCartItems } from '../../actions/cart';

const NavFilter = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.user);
    const { cart } = useSelector(state => state.cart);
    const { filters } = useSelector(state => state.products);

    const dispatch = useDispatch();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    useEffect(() => {
        document.querySelector('.navbar').style.top = '0';
        if (isAuthenticated) dispatch(getCartItems());
        // eslint-disable-next-line
    }, [isAuthenticated]);
    useEffect(() => {
        customSearch();
        // eslint-disable-next-line
    }, [filters?.page]);

    const updateFilters = (filters) => {
        dispatch({
            type: 'UPDATE_FILTERS',
            payload: filters
        })
    }
    const customSearch = () => {
        const { searchTerm, minPrice, maxPrice, selectedRating, page } = filters;
        dispatch(customProdSearch({ searchTerm, lt: maxPrice, gt: minPrice, page, ratings_gte: selectedRating }));
    }
    const toggleSideNav = () => {
        if (isSideNavOpen) document.getElementById("mySidenav").style.width = "0px";
        else document.getElementById("mySidenav").style.width = "25rem";
        setIsSideNavOpen(!isSideNavOpen);
    }
    return (
        <>
            {/* navbar start */}
            <nav className="navbar">
                <i className="fa-solid fa-filter fontawesome-icons item" onClick={toggleSideNav}></i>
                <div className="logo" onClick={() => { navigate('/') }}>
                    <img src={f1png} alt="logo" />
                    <div className="text">MoKo Shop</div>
                </div>
                <div className="item search right" tabIndex="0">
                    <div className="search-group">
                        <input
                            type="text"
                            placeholder='Search...'
                            value={filters?.searchTerm || ''}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && filters?.page !== 1) {
                                    updateFilters({ ...filters, page: 1 })
                                    return;
                                }
                                if (e.key === "Enter") customSearch();
                            }}
                            onChange={(e) => {
                                updateFilters({ ...filters, searchTerm: e.target.value })
                            }} />
                        <i
                            className="fa-solid fa-magnifying-glass fontawesome-icons search-icon"
                            onClick={() => { customSearch() }}
                        ></i>
                    </div>
                </div>
                {
                    !isAuthenticated &&
                    <Link to="/login" className="item">
                        <div className="group">
                            <i className="fontawesome-icons fa-regular fa-circle-user"></i>
                            &nbsp;
                            <div className="detail">
                                Account
                                <div className="sub">Sign In</div>
                            </div>
                        </div>
                    </Link>
                }
                {
                    isAuthenticated &&
                    <>
                        <div className="item hoverForOptions">
                            <div className="group">
                                {
                                    user?.avatar?.url ?
                                        <i className="fontawesome-icons">
                                            <img src={user?.avatar.url} alt={user?.name || 'profile'} className="userIcon" />
                                        </i>
                                        :
                                        <i className="fontawesome-icons">
                                            <img src={previewAvatar} alt={user?.name || 'profile'} className="userIcon" />
                                        </i>
                                }
                                <div className="detail">
                                    Account
                                    <div className="sub">{user?.name}</div>
                                </div>
                            </div>
                            <div className="customerOptions">
                                <p onClick={() => { navigate('/myorders') }}>Previous Orders</p>
                                {user?.role === 'admin' && <p>Dashboard</p>}
                                <p onClick={() => { navigate('/me') }}>View Profile</p>
                                <p onClick={() => { dispatch(logout()) }}>Log Out</p>
                            </div>
                        </div>
                        <Link to={`/cart`} className="item">
                            <div className="group">
                                <i className="fa-solid fa-cart-shopping fontawesome-icons"></i>&nbsp;
                                <div className="detail">
                                    Cart
                                    <div className="sub">Rs {cart?.total ? cart?.total : '0.0'}</div>
                                </div>
                            </div>
                        </Link>
                    </>
                }
            </nav>
            {/* navbar ends */}
            <div id="mySidenav" className="sidenav">
                <i className="fa-solid fa-xmark" onClick={toggleSideNav} style={{ marginLeft: "1rem" }}></i>
                <div className="card-body">
                    <p>Min Price:</p>
                    <p>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="1"
                            value={filters.minPrice || 0}
                            onChange={(e) => {
                                if (e.target.value > filters?.maxPrice) return;
                                updateFilters({ ...filters, minPrice: parseInt(e.target.value) })
                            }}
                        />
                        <span>{filters?.minPrice}</span>
                    </p>
                    <p>Max Price:</p>
                    <p>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            step="1"
                            value={filters?.maxPrice}
                            onChange={(e) => {
                                if (e.target.value < filters?.minPrice) return;
                                updateFilters({ ...filters, maxPrice: parseInt(e.target.value) })
                            }}
                        />
                        <span>{filters?.maxPrice}</span>
                    </p>
                </div>
                <p>Minimum Rating</p>
                <select
                    id="rating"
                    value={filters?.selectedRating || 0}
                    style={{ backgroundColor: 'white', outline: 'none' }}
                    onChange={(e) => {
                        updateFilters({ ...filters, selectedRating: parseInt(e.target.value) })
                    }}
                >
                    <option value="0">Select One</option>
                    <option value="0">0+</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                </select>
                <p>
                    <button
                        className="applyFilter-btn"
                        onClick={() => {
                            if (filters?.page !== 1) updateFilters({ ...filters, page: 1 })
                            else customSearch()
                            toggleSideNav();
                        }}
                    >
                        Apply Filters
                    </button>
                </p>
            </div>

        </>
    )
}

export default NavFilter