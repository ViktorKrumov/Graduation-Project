import React from 'react';
import './Nav.css';

import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";

function Nav({ query, handleInputChange }) {
    return (
        <>
            <nav className="navContainer">
                <div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Enter a computer"
                        value={query}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="profile-container">
                    <a href="#"><FiHeart className="nav-icons" /></a>
                    <a href="#"><AiOutlineShoppingCart className="nav-icons" /></a>
                    <a href="#"><AiOutlineUserAdd className="nav-icons" /></a>
                </div>
            </nav>
        </>
    )
}

export default Nav;
