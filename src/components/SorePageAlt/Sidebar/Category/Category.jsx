import React from 'react';


const Category =() => {
    return(
        <>
        <div>
            <h2 className='sidebar-title'>Category</h2>

            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>All

                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>CritpoMining

                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>Gaming

                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>Measaring

                    <input type="radio" name="test"/>
                    <span className="checkmark"></span>Filmproducing
                </label>
            </div>
        </div>
       
        </>
       
    )

}
export default Category