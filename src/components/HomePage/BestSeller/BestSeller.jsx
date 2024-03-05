import React from "react";
import CardItem from './CardItem';
import './BestSeller.css';

const BestSeller = () => {
  return (
    <div className='cards'>
      <h1>Best Sellers - Computers</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc7.jpg?raw=true'
              text='Discover the latest gaming PC with high-end graphics'
              label='Gaming'
              path='/product/7'
            />
            <CardItem
              src='https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc4.png?raw=true'
              text='Upgrade your workstation with cutting-edge technology'
              label='Professional'
              path='/product/4'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc5.png?raw=true'
              text='Explore powerful servers for your business needs'
              label='Business'
              path='/product/5'
            />
            <CardItem
              src='https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc2.png?raw=true'
              text='Enjoy sleek and slim laptops for on-the-go productivity'
              label='Portable'
              path='/product/2'
            />
            <CardItem
              src='https://github.com/ViktorKrumov/Images-Graduation-Project/blob/main/Pc6.jpg?raw=true'
              text='Build your custom PC for ultimate performance'
              label='Custom Builds'
              path='/product/6'
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
