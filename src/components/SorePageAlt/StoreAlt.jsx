import React from 'react';
import Navigation from './Navigation/Nav';
import Recommended from './Recommended/Recommended';
import Products from './Products/Products';
import Sidebar from './Sidebar/Sidebar'
import styled from 'styled-components';
import './StoreAlt.css';

const StoreAlt =() => {
    return(
        <>
        <Sidebar/>
        <Navigation/>
        <Recommended/>
        <Products/>
        </>
    )

}
export default StoreAlt