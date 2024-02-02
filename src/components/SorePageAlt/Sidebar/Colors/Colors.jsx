import React from 'react';
import './Colors.css';
import Input from '../../../input';

const Colors =({handleChange}) => {
    return(
        <>
        <div>
            <h2 className='sidebar-title color-title'>Colors</h2>
             <label className="sidebar-label-container">
                <input onChange={handleChange} type ="radio" value="" name = "test1"/>
                <span className='checkmark all'></span>All
               </label>

               <Input
               handleChange={handleChange}
               value="Black"
               title="Balck"
               name="test1"
               color="black"
               />
               <Input
               handleChange={handleChange}
               value="Blue"
               title="Blue"
               name="test1"
               color="blue"
               />
               <Input
               handleChange={handleChange}
               value="Green"
               title="Green"
               name="test1"
               color="green"
               />
               <Input
               handleChange={handleChange}
               value="Red"
               title="Red"
               name="test1"
               color="red"
               />
               <label className="sidebar-label-container">
                <input type="radio" onChange={handleChange} value="White" name ="test1"/>
                <span className='checkmark' style={{background:"whtie",border:"2px solid black"}}></span>White
              </label>
        </div>
        </>
       
    )

}
export default Colors