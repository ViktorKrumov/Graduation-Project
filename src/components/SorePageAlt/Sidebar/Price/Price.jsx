import React from 'react';
import './Price.css';


const Price =() => {
    return(
        <>
         <div className='ml'>
            <h2 className='sider-title price-title'>Price</h2>

            <label className='sidebar-label-container'>
                    <input type="radio" name="test2"/>
                    <span className="checkmark"></span>200лв - 600лв
                </label>

                <label className='sidebar-label-container'>
                    <input type="radio" name="test2"/>
                    <span className="checkmark"></span>700лв - 1200лв
                </label>

                <label className='sidebar-label-container'>
                    <input type="radio" name="test2"/>
                    <span className="checkmark"></span>1500лв - 2500лв
                </label>

                <label className='sidebar-label-container'>
                    <input type="radio" name="test2"/>
                    <span className="checkmark"></span>3000лв - 4500лв
                </label>

                <label className='sidebar-label-container'>
                    <input type="radio" name="test2"/>
                    <span className="checkmark"></span>Over 5000лв
                </label>
         </div>
        </>
       
    )

}
export default Price