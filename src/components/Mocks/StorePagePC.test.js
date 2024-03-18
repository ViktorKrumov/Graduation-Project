import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StorePageFinal from '../StorePageFinal/StorePageFinal';
import '@testing-library/jest-dom/extend-expect';

describe('StorePageFinal component', () => {
  jest.mock('../api2', () => ({
    fetchData: jest.fn(() => Promise.resolve([])),
  }));

  test('renders specific products correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', price: 1000, color: 'Blue' },
      { id: 2, name: 'Wireless Mouse', price: 50, color: 'Red' },
    ];

    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText } = render(<StorePageFinal />);
    
    
    expect(await findByText('Gaming Laptop')).toBeInTheDocument();
  });

  test('filters products by color correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', price: 1000, color: 'Red' },
      { id: 2, name: 'Home Office PC', price: 50, color: 'Blue' },
    ];
  
    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal />);
  
   
    expect(await findByText('Gaming Laptop')).toBeInTheDocument();
    expect(await findByText('Home Office PC')).toBeInTheDocument();
  
    
    const blueColorCheckbox = getByLabelText('Red');
    fireEvent.click(blueColorCheckbox);
  
    
    await waitFor(() => {
      
      expect(queryByText('Gaming Laptop')).toBeInTheDocument();
      expect(queryByText('Home Office PC')).not.toBeInTheDocument();
    });
  });

  test('filters products by company correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', price: 1000, company: 'Acer' },
      { id: 2, name: 'Home Office PC', price: 50, company: 'Dell' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal />);
  
    expect(await findByText('Gaming Laptop')).toBeInTheDocument();
    expect(await findByText('Home Office PC')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('Acer');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('Gaming Laptop')).toBeInTheDocument();
      expect(queryByText('Home Office PC')).not.toBeInTheDocument();
    });
  });
  

  test('filters products by category correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', price: 1000, category: 'Gaming' },
      { id: 2, name: 'Home Office PC', price: 50, category: 'Business' },
    ];
  
    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal />);
  
   
    expect(await findByText('Gaming Laptop')).toBeInTheDocument();
    expect(await findByText('Home Office PC')).toBeInTheDocument();
  
    
    const blueColorCheckbox = getByLabelText('Gaming');
    fireEvent.click(blueColorCheckbox);
  
    
    await waitFor(() => {
      
      expect(queryByText('Gaming Laptop')).toBeInTheDocument();
      expect(queryByText('Home Office PC')).not.toBeInTheDocument();
    });
  });


  test('filters products by graphic card correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', price: 1000, graphics_card: 'NVIDIA GeForce RTX 3060' },
      { id: 2, name: 'Home Office PC', price: 50, graphic_card: 'Business' },
    ];
  
    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal />);
  
   
    expect(await findByText('Gaming Laptop')).toBeInTheDocument();
    expect(await findByText('Home Office PC')).toBeInTheDocument();
  
    
    const blueColorCheckbox = getByLabelText('GeForce RTX 3060');
    fireEvent.click(blueColorCheckbox);
  
    
    await waitFor(() => {
      
      expect(queryByText('Gaming Laptop')).toBeInTheDocument();
      expect(queryByText('Business Desktop')).not.toBeInTheDocument();
    });
  });

  test('filters products by processor correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Developer Workstation', price: 1000, processor: 'AMD Ryzen 7 3990X' },
      { id: 2, name: 'Home Office PC', price: 50, graphic_card: 'Business' },
    ];
  
    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal />);
  
   
    expect(await findByText('Gaming Laptop')).toBeInTheDocument();
    expect(await findByText('Home Office PC')).toBeInTheDocument();
  
    
    const blueColorCheckbox = getByLabelText('AMD Ryzen 7');
    fireEvent.click(blueColorCheckbox);
  
    
    await waitFor(() => {
      
      expect(queryByText('Developer Workstation')).toBeInTheDocument();
      expect(queryByText('Business Desktop')).not.toBeInTheDocument();
    });
  });

  test('filters products by price range correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', price: 1500, color: 'Blue' },
      { id: 2, name: 'Home Office PC', price: 50, color: 'Red' },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });

    const { findByText, queryByText, getByPlaceholderText, getByText } = render(<StorePageFinal />);
    
   
    expect(await findByText('Gaming Laptop')).toBeInTheDocument();
    expect(await findByText('Home Office PC')).toBeInTheDocument();

    const minPriceInput = getByPlaceholderText('Min Price');
    const maxPriceInput = getByPlaceholderText('Max Price');

   
    fireEvent.change(minPriceInput, { target: { value: '1000' } });
    fireEvent.change(maxPriceInput, { target: { value: '1500' } });

    
    fireEvent.click(getByText('Apply'));

    
    await waitFor(() => {
      
      expect(queryByText('Gaming Laptop')).toBeInTheDocument();
      expect(queryByText('Home Office PC')).not.toBeInTheDocument();
    });
  });
});

