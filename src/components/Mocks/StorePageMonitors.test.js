import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StorePageFinal2 from '../StorePageFinal 2/StorePageFinal2';
import '@testing-library/jest-dom/extend-expect';

describe('StorePageFinal component', () => {
  jest.mock('../api3', () => ({
    fetchData: jest.fn(() => Promise.resolve([])),
  }));

  test('renders specific products correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Acer Nitro VG270Ebmiix', price: 1000, color: 'Blue' },
      { id: 2, name: 'Wireless Mouse', price: 50, color: 'Red' },
    ];

    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText } = render(<StorePageFinal2 />);
    
    
    expect(await findByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
  });


  test('filters products by company correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Acer Nitro VG270Ebmiix', price: 1000, company: 'Acer' },
      { id: 2, name: 'Dell P2423', price: 50, company: 'Dell' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal2 />);
  
    expect(await findByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
    expect(await findByText('Dell P2423')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('Acer');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
      expect(queryByText('Dell P2423')).not.toBeInTheDocument();
    });
  });
  


  test('filters products by refresh rate correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Acer Nitro VG270Ebmiix', price: 1000, refresh_rate: '100Hz' },
      { id: 2, name: 'Dell P2423', price: 50, refresh_rate: '444Hz' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal2 />);
  
    expect(await findByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
    expect(await findByText('Dell P2423')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('100Hz');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
      expect(queryByText('Dell P2423')).not.toBeInTheDocument();
    });
  });



 test('filters products by resolution correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Acer Nitro VG270Ebmiix', price: 1000, resolution: '1920 x 1080' },
      { id: 2, name: 'Dell P2423', price: 50, resolution: '64K' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal2 />);
  
    expect(await findByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
    expect(await findByText('Dell P2423')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('1920 x 1080');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
      expect(queryByText('Dell P2423')).not.toBeInTheDocument();
    });
  });

  test('filters products by panel type correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Acer Nitro VG270Ebmiix', price: 1000, panel_type: 'VA' },
      { id: 2, name: 'Dell P2423', price: 50, panel_type: 'IPS' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal2 />);
  
    expect(await findByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
    expect(await findByText('Dell P2423')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('VA');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
      expect(queryByText('Dell P2423')).not.toBeInTheDocument();
    });
  });


  test('filters products by screen size correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Acer Nitro VG270Ebmiix', price: 1000, screen_size: '20 inches' },
      { id: 2, name: 'Dell P2423', price: 50, screen_size: '27 inches' },
    ];
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText, queryByText, getByLabelText } = render(<StorePageFinal2 />);
  
    expect(await findByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
    expect(await findByText('Dell P2423')).toBeInTheDocument();
  
    
    const asusCheckbox = getByLabelText('20 inches');
    fireEvent.click(asusCheckbox);
  
    await waitFor(() => {
      expect(queryByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
      expect(queryByText('Dell P2423')).not.toBeInTheDocument();
    });
  });


  test('filters products by price range correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Acer Nitro VG270Ebmiix', price: 1599, color: 'Blue' },
      { id: 2, name: 'Dell P2423', price: 4999, color: 'Red' },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });

    const { findByText, queryByText, getByPlaceholderText, getByText } = render(<StorePageFinal2 />);
    
   
    expect(await findByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
    expect(await findByText('Dell P2423')).toBeInTheDocument();

    const minPriceInput = getByPlaceholderText('Min Price');
    const maxPriceInput = getByPlaceholderText('Max Price');

   
    fireEvent.change(minPriceInput, { target: { value: '1000' } });
    fireEvent.change(maxPriceInput, { target: { value: '1700' } });

    
    fireEvent.click(getByText('Apply'));

    
    await waitFor(() => {
      
      expect(queryByText('Acer Nitro VG270Ebmiix')).toBeInTheDocument();
      expect(queryByText('Dell P2423')).not.toBeInTheDocument();
    });
  });
});

