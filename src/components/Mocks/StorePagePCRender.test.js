import React from 'react';
import { render } from '@testing-library/react';
import StorePageFinal from '../StorePageFinal/StorePageFinal';
import '@testing-library/jest-dom/extend-expect';

describe('StorePageFinal component', () => {
  jest.mock('../api2', () => ({
    fetchData: jest.fn(() => Promise.resolve([])),
  }));

  test('renders specific products correctly', async () => {
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', price: 1000 },
      { id: 2, name: 'Wireless Mouse', price: 50 },
    ];
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockProducts),
    });
  
    const { findByText } = render(<StorePageFinal />);
    expect(await findByText('Gaming Laptop')).toBeInTheDocument();
    
  });

  
});
