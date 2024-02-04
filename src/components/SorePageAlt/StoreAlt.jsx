import React, { useState, useEffect } from 'react';
import Navigation from './Navigation/Nav';
import Recommended from './Recommended/Recommended';
import Products from './Products/Products';
import Sidebar from './Sidebar/Sidebar'
import styled from 'styled-components';
import './StoreAlt.css'

import { fetchData } from '../../components/api';
import Card from '../Card';

const StoreAlt =() => {

    const [computers, setComputers] = useState([]);

  useEffect(() => {
    fetchData()
      .then(data => {
        setComputers(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  console.log(computers)

    const [selectedCategory, setSelectedCategory] = useState(null)

    //input filter
    const [query, setQuery] = useState("")

    const handleInputChange = event =>{
        setQuery(event.target.value)
    }

    const fillteredItems = computers.filter((computer) => 
    computer.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())!== -1

    );

    //Radio filter
    const handleChange = event => {
        setSelectedCategory(event.target.value)
        
    }

    //Buttons filter
    const handleClick = event =>{
        setSelectedCategory(event.target.value)
    }

    function fillteredData(computers, selected, query){
        let fillteredProducts = computers

        //Filltering input items
        if(query){
            fillteredProducts = fillteredItems
        }

        //Selectered filter
        if(selected){
        fillteredProducts= fillteredProducts.filter(
            ({ category, color, company, discounted_price, name}) => 
            category === selected || color === selected || 
            company === selected || discounted_price === selected || name === selected
            ) 
        }

        return fillteredProducts.map(({photo_url, name, processor, memory, storage, graphics_card, operating_system, original_price, discounted_price}) => (
            <Card
            key={Math.random()}
            photo_url = {photo_url}
            name = {name}
            processor = {processor}
            memory = {memory}
            storage = {storage}
            graphics_card = {graphics_card}
            operating_system = {operating_system}
            original_price = {original_price}
            discounted_price = {discounted_price}
            />
        ));
    }

    const result = fillteredData(computers, selectedCategory, query)

    return(
        <>
        <Sidebar handleChange={handleChange}/>
        {/* <Navigation query={query} handleInputChange={handleInputChange}/> */}
        <Recommended handleChange={handleClick}/>
        <Products result={result}/>
        </>
    )

}
export default StoreAlt