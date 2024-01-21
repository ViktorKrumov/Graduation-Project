import React from 'react';
import './Category.css';
import Input from '../../../Input';

const Category =({handleChange}) => {
    return(
        <>
        <div>
            <h2 className='sidebar-title'>Category</h2>

            <div>
               <label className="sidebar-label-container">
                <input onChange={handleChange} type ="radio" value="" name = "test"/>
                <span className='checkmark'></span>All
               </label>

               <Input
               handleChange={handleChange}
               value="Gaming"
               title="Gaming"
               name="test"
               />
                <Input
               handleChange={handleChange}
               value="Workingstation"
               title="Workingstation"
               name="test"
               />
                <Input
               handleChange={handleChange}
               value="Crypto Mining"
               title="Crypto Mining"
               name="test"
               />
                <Input
               handleChange={handleChange}
               value="Streaming"
               title="Streaming"
               name="test"
               />
            </div>
        </div>
       
        </>
       
    )

}
export default Category