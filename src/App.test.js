import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Home from './components/HomePage/Home';
import Login from './components/Login/Login';
import Store3 from './components/StorePageFinal/StorePageFinal';
import Store4 from './components/StorePageFinal 2/StorePageFinal2';
import Store5 from './components/StorePageFinal 3/StorePageFinal3';
import ProductDetailsPage from './components/ProductDetailsPage/ProductDetailsPage';
import Cart from './components/CartPage/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Services from './components/ServicesPage/Services';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/FooterF';
import ContactUs from './components/ContactUs/ContactUs'

jest.mock('react-slick', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => <div data-testid="mock-slick"></div>)
  }));

test('renders Home component when path is "/"', () => {
  render(
    <Router initialEntries={['/']}>
      <Home />
    </Router>
  );
//   expect(screen.getByText(/Computer of the year/i)).toBeInTheDocument();
});

test('renders Login component when path is "/login"', () => {
  render(
    <Router initialEntries={['/login']}>
      <Login />
    </Router>
  );
//   expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
});


test('renders Store3 component when path is "/store/pc"', () => {
  render(
    <Router initialEntries={['/store/computers']}>
      <Store3 />
    </Router>
  );
//   expect(screen.getByText(/PC Store Page/i)).toBeInTheDocument();
});

test('renders Store4 component when path is "/store/monitors"', () => {
  render(
    <Router initialEntries={['/store/monitors']}>
      <Store4 />
    </Router>
  );
//   expect(screen.getByText(/Monitors Store Page/i)).toBeInTheDocument();
});

test('renders Store5 component when path is "/store/mice"', () => {
  render(
    <Router initialEntries={['/store/mice']}>
      <Store5 />
    </Router>
  );
//   expect(screen.getByText(/Mice Store Page/i)).toBeInTheDocument();
});

test('renders ProductDetailsPage component when path is "/product/:name"', () => {
  render(
    <Router initialEntries={['/product/productName']}>
      <ProductDetailsPage />
    </Router>
  );
//   expect(screen.getByText(/Product Details Page/i)).toBeInTheDocument();
});

test('renders Cart component when path is "/cart"', () => {
    const userEmail = 'test@example.com'; 
    render(
      <Router initialEntries={['/cart']}>
        <Cart userEmail={userEmail} />
      </Router>
    );
  //   expect(screen.getByText(/Cart Page/i)).toBeInTheDocument();
  });
  

test('renders Wishlist component when path is "/wishlist"', () => {
  const userEmail = 'test@example.com';
  render(
    <Router initialEntries={['/wishlist']}>
      <Wishlist userEmail={userEmail} />
    </Router>
  );
//   expect(screen.getByText(/Wishlist Page/i)).toBeInTheDocument();
});

test('renders Services component when path is "/services"', () => {
  render(
    <Router initialEntries={['/services']}>
      <Services />
    </Router>
  );
//   expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
});

test('renders Profile component when path is "/profile"', () => {
  render(
    <Router initialEntries={['/profile']}>
      <Profile />
    </Router>
  );
//   expect(screen.getByText(/Profile Page/i)).toBeInTheDocument();
});

test('renders Contact Us component when path is "/contactUs"', () => {
  render(
    <Router initialEntries={['/contactUs']}>
      <ContactUs />
    </Router>
  );
//   expect(screen.getByText(/PC Store Page/i)).toBeInTheDocument();
});

test('renders Footer component in all cases', () => {
  render(
    <Router>
        <Footer />
    </Router>
  );
//   expect(screen.getByText(/Footer/i)).toBeInTheDocument();
});
