import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from '../Navbar';

// Mock `useCookies` hook
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: jest.fn(),
}));

// Mock `useNavigate` hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Navbar Integration Test', () => {
  const mockRemoveCookie = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useCookies.mockReturnValue([{ user: { name: 'John Doe' } }, jest.fn(), mockRemoveCookie]);
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  it('renders links based on user login state and handles logout', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check for "Workouts" link and "Logout" button
    expect(screen.getByText(/Workouts/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    // Simulate clicking the "Logout" button
    fireEvent.click(screen.getByText(/Logout/i));

    // Check that the cookie is removed
    expect(mockRemoveCookie).toHaveBeenCalledWith('user', { path: '/' });

    // Check that navigation occurs
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});