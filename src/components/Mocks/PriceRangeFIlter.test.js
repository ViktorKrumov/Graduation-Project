import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import PriceRangeFilter from '../StorePageFinal/Sidebar/PriceRangeFilter/PriceRangeFIlter'; 

describe('PriceRangeFilter component', () => {
    test('updates min and max price values on input change', () => {
      const { getByPlaceholderText } = render(<PriceRangeFilter />);
      const minPriceInput = getByPlaceholderText('Min Price'); 
      const maxPriceInput = getByPlaceholderText('Max Price'); 
  
      fireEvent.change(minPriceInput, { target: { value: '100' } });
      fireEvent.change(maxPriceInput, { target: { value: '500' } });
  
      expect(minPriceInput).toHaveValue(100);
      expect(maxPriceInput).toHaveValue(500);
    });
  
    test('resets input fields and calls handlePriceRangeFilter with empty strings on clear click', () => {
        const handlePriceRangeFilterMock = jest.fn();
      const { getByText, getByPlaceholderText } = render(
        <PriceRangeFilter handlePriceRangeFilter={handlePriceRangeFilterMock} />
      );
      const minPriceInput = getByPlaceholderText('Min Price'); 
      const maxPriceInput = getByPlaceholderText('Max Price'); 
  
      fireEvent.change(minPriceInput, { target: { value: '100' } });
      fireEvent.change(maxPriceInput, { target: { value: '500' } });
  
      fireEvent.click(getByText('Clear'));
  
      expect(minPriceInput).toHaveValue(null);
      expect(maxPriceInput).toHaveValue(null);
      expect(handlePriceRangeFilterMock).toHaveBeenCalledWith('', '');
    });
  });
