import React from 'react';
import './Category.css';


const Category =() => {
    return(
        <>
        <div>
            <h2 className='sidebar-title'>Category</h2>

            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>All
                </label>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>Gaming
                </label>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>CryptoMining
                </label>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>Rendering
                </label>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>Editing
                </label>
            </div>
        </div>
       
        </>
       
    )

}
export default Category