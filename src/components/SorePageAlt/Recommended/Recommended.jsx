import React from 'react';
import './Recommended.css';

const Recommended =() => {
    return(
        <>
        <div>
            <h2 className="recommended-title" >Recommended</h2>
            <div className="recommended-flex">
                <button className='btns'>Gaming</button>
                <button className='btns'>Office</button>
                <button className='btns'>Home</button>
            </div>
        </div>
        </>
    )

}
export default Recommended