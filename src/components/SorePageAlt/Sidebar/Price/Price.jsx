import React from 'react';
import './Price.css';
import Input from '../../../Input';


const Price =({handleChange}) => {
    
    return(
        <>
         <div className='ml'>
            <h2 className='sider-title price-title'>Price</h2>

            <label className="sidebar-label-container">
                <input onChange={handleChange} type ="radio" value="" name = "test2"/>
                <span className='checkmark'></span>All
               </label>

            <Input
            handleChange={handleChange}
            value={50}
            title="0-150lv"
            name ="test2"
            />
             <Input
            handleChange={handleChange}
            value={50}
            title="150-550lv"
            name ="test2"
            />
             <Input
            handleChange={handleChange}
            value={50}
            title="600-1000lv"
            name ="test2"
            />
             <Input
            handleChange={handleChange}
            value={50}
            title="Over 5000lv"
            name ="test2"
            />
         </div>
        </>
       
    )

}
export default Price