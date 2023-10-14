import React from 'react';
import {NavLink} from "react-router-dom";
import './NavBar.css';

const NavBar =() => {
    return(
        <>
        <header>
            <div className="container container-flex">
                <div className="logoContainer">
                    {/* <img src={logo} alt ="logo" className="logo"/> */}
                </div>
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink exact to="/" activeClassName="active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/store" activeClassName="active">Store</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/trendy" activeClassName="active">Trendy</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/laboratory" activeClassName="active">Laboratory</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login-register" activeClassName="active">Login/Register</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )

}
export default NavBar