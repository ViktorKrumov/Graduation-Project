import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'; 
import './AdminPage.css'; 

const AdminPage = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      const db = getFirestore();
      const usersSnapshot = await getDocs(collection(db, 'UserDetails'));
      const usersData = usersSnapshot.docs.map(doc => doc.data());
      setRegisteredUsers(usersData);
    };

    const fetchOrders = async () => {
      const db = getFirestore();
      const ordersSnapshot = await getDocs(collection(db, 'Orders'));
      const ordersData = ordersSnapshot.docs.map(doc => doc.data());
      setOrders(ordersData);
    };

    fetchRegisteredUsers();
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h1 className="header">Registered Users</h1>
      <RegisteredUsersTable registeredUsers={registeredUsers} />
      <br></br>
      <h1 className="header">All Orders</h1>
      <OrdersTable orders={orders} />
    </div>
  );
};


const RegisteredUsersTable = ({ registeredUsers }) => {
  return (
    <Table className="table">
      <Thead>
        <Tr>
          <Th>User Email</Th>
          <Th>Full Name</Th>
          <Th>Phone Number</Th>
          <Th>Date of Birth</Th>
          <Th>Address</Th>
          <Th>User Photo</Th>
        </Tr>
      </Thead>
      <Tbody>
        {registeredUsers.map(user => (
          <Tr key={user.email}>
            <Td>{user.email}</Td>
            <Td>{user.fullName}</Td>
            <Td>{user.phoneNumber}</Td>
            <Td>{user.dateOfBirth}</Td>
            <Td>{user.address}</Td>
            <Td><img className="userPhoto" src={user.photo} alt={user.fullName} /></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};


const OrdersTable = ({ orders }) => {
    return (
      <Table className="table">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>User Email</Th>
            <Th>Full Name</Th>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.email}</Td>
              <Td>{order.fullName}</Td>
              <Td>
                <ul>
                  {order.items && order.items.map(item => (
                    <li key={item.productId}>
                      {item.productName}
                    </li>
                  ))}
                </ul>
              </Td>
              <Td>
                <ul>
                  {order.items && order.items.map(item => (
                    <li key={item.productId}>
                      {item.quantity}
                    </li>
                  ))}
                </ul>
              </Td>
              <Td>
                {order.createdAt ? new Date(order.createdAt.toDate()).toLocaleDateString() : 'N/A'}
             </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };
  
  

export default AdminPage;
