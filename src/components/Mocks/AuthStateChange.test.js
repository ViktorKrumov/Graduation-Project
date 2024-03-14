import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import App from '../../App';
import '@testing-library/jest-dom/extend-expect'; 

jest.mock('firebase/auth', () => ({
  __esModule: true,
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn()
}));

jest.mock('react-slick', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div data-testid="mock-slick"></div>)
}));

describe('App component', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('displays warning message when user is not logged in', async () => {
    const onAuthStateChangedMock = jest.fn((auth, callback) => callback(null));
    require('firebase/auth').onAuthStateChanged = onAuthStateChangedMock;

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(/Please log in to access all features/i)).toBeInTheDocument();
  });

  it('does not display warning message when user is logged in', async () => {
    const onAuthStateChangedMock = jest.fn((auth, callback) => callback({ email: 'test@example.com' }));
    require('firebase/auth').onAuthStateChanged = onAuthStateChangedMock;

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.queryByText(/Please log in to access all features/i)).not.toBeInTheDocument();
  });
});
