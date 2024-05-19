import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StoreMice from '../PCMiceStorePage/PCMiceStorePage'
import '@testing-library/jest-dom/extend-expect';

describe('StorePageFinal component', () => {
  jest.mock('../apiMice', () => ({
    fetchData: jest.fn(() => Promise.resolve([])),
  }));

  test('renders specific products correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Logitech G102 LIGHTSYNC Black', price: 1000, color: 'Blue' },
      { id: 2, name: 'ASUS ROG Harpe Ace Aim Lab Edition, White', price: 50, color: 'Red' },
    ];

    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText } = render(<StoreMice />);
    
    
    expect(await findByText('Logitech G102 LIGHTSYNC Black')).toBeInTheDocument();
  });


  test('filters products by company correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Logitech G102 LIGHTSYNC Black', price: 1000, company: 'Logitech' },
      { id: 2, name: 'ASUS ROG Harpe Ace Aim Lab Edition, White', price: 50, company: 'Asus' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StoreMice />);
  
    expect(await findByText('Logitech G102 LIGHTSYNC Black')).toBeInTheDocument();
    expect(await findByText('ASUS ROG Harpe Ace Aim Lab Edition, White')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('Asus');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('ASUS ROG Harpe Ace Aim Lab Edition, White')).toBeInTheDocument();
      expect(queryByText('Logitech G102 LIGHTSYNC Black')).not.toBeInTheDocument();
    });
  });
  


  test('filters products by connection correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Logitech G102 LIGHTSYNC Black', price: 1000, connection: 'Wired' },
      { id: 2, name: 'ASUS ROG Harpe Ace Aim Lab Edition, White', price: 50, connection: 'Wireless' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StoreMice />);
  
    expect(await findByText('Logitech G102 LIGHTSYNC Black')).toBeInTheDocument();
    expect(await findByText('ASUS ROG Harpe Ace Aim Lab Edition, White')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('Wired');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('Logitech G102 LIGHTSYNC Black')).toBeInTheDocument();
      expect(queryByText('ASUS ROG Harpe Ace Aim Lab Edition, White')).not.toBeInTheDocument();
    });
  });



  test('filters products by color correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Logitech G102 LIGHTSYNC Black', price: 1000, color: 'Black' },
      { id: 2, name: 'ASUS ROG Harpe Ace Aim Lab Edition, White', price: 50, color: 'White' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StoreMice />);
  
    expect(await findByText('Logitech G102 LIGHTSYNC Black')).toBeInTheDocument();
    expect(await findByText('ASUS ROG Harpe Ace Aim Lab Edition, White')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('Black');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('Logitech G102 LIGHTSYNC Black')).toBeInTheDocument();
      expect(queryByText('ASUS ROG Harpe Ace Aim Lab Edition, White')).not.toBeInTheDocument();
    });
  });



  test('filters products by price range correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Logitech G102 LIGHTSYNC Black', price: 49, color: 'Blue' },
      { id: 2, name: 'ASUS ROG Harpe Ace Aim Lab Edition, White', price: 249, color: 'Red' },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });

    const { findByText, queryByText, getByPlaceholderText, getByText } = render(<StoreMice />);
    
   
    expect(await findByText('Logitech G102 LIGHTSYNC Black')).toBeInTheDocument();
    expect(await findByText('ASUS ROG Harpe Ace Aim Lab Edition, White')).toBeInTheDocument();

    const minPriceInput = getByPlaceholderText('Min Price');
    const maxPriceInput = getByPlaceholderText('Max Price');

   
    fireEvent.change(minPriceInput, { target: { value: '20' } });
    fireEvent.change(maxPriceInput, { target: { value: '50' } });

    
    fireEvent.click(getByText('Apply'));

    
    await waitFor(() => {
      
      expect(queryByText('Logitech G102 LIGHTSYNC Black')).toBeInTheDocument();
      expect(queryByText('ASUS ROG Harpe Ace Aim Lab Edition, White')).not.toBeInTheDocument();
    });
  });
});

