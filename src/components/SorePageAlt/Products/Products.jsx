import React, { useState, useEffect } from 'react';
import {BsFillBagHeartFill} from 'react-icons/bs'
import './Products.css';

const Products =() => {
    const [computers, setComputers] = useState([]);

    useEffect(() => {
        fetch('https://gist.githubusercontent.com/ViktorKrumov/f29035d526ddc0c4f74d1ac18bd9e283/raw')
          .then((response) => response.json())
          .then((data) => {
            if (data && data.computers && Array.isArray(data.computers)) {
              setComputers(data.computers);
            } else {
              throw new Error('Fetched data is not in the expected format');
            }
          })
          .catch((error) => {
            console.error('Error fetching or processing data:', error);
          });
      }, []); 

    return(
        <>
        <section className ="card-container">
            

            {computers.map((computer) => (
            <div className="card">

            <img className="card-img" src={computer.photo_url} alt={computer.name} />
            <div className='card-detials'>
                {/* <h3 className='card-title'>{computer.name}</h3> */}


                <p className = "stat">Processor: {computer.processor}</p>
                <p className = "stat">Memory: {computer.memory}</p>
                <p className = "stat">Storage: {computer.storage}</p>
                <p className = "stat">Graphics Card: {computer.graphics_card}</p>
                <p className = "stat">Operating System: {computer.operating_system}</p>
                
                <section className='card-price'>
                    <div className='price'>
                        <del>{computer.original_price} лв</del>{computer.discounted_price} лв
                    </div>

                    <div className='bag'>
                        <BsFillBagHeartFill className='bag-icon'/>
                    </div>
                </section>
            </div>
            
           
            
            
            
            </div>
        ))}


            </section>
       
        </>
    )

}
export default Products