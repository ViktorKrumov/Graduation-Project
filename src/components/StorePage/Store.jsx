
import React, { useState } from 'react';
import styled from 'styled-components';
import Products from './Products1/Products1';
import Filtering from './Filtering/Filtering';

const Section = styled.section`
  margin-bottom: 100px;
  background-color: black;
  display: flex;
`;

const Left = styled.div`
  order: 1;
  flex-grow: 1;
`;

const Right = styled.div`
  order: 2;
  flex-grow: 1;
`;

const Store = () => {
  const [order, setOrder] = useState('default');

  const handleOrderChange = (selectedOrder) => {
    setOrder(selectedOrder);
  };

  return (
    <>
      <Section>
        <Left>
          <Filtering handleOrderChange={handleOrderChange} />
        </Left>
        <Right>
          <Products order={order} />
        </Right>
      </Section>
    </>
  );
};

export default Store;
