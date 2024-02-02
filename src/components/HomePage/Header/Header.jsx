import React from 'react';
import styled from 'styled-components';
import './Header.css';

import Video from '../x2mate.com-Technology Background Video Loop For Website.mp4';

const Header = () => {
  

  return (
    <>
      <div className='hero-container'>
      <video src={Video} autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        {/* <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      </div>
    </div>
    </>
  );
};

export default Header;
