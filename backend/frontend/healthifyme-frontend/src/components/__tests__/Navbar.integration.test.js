import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Mock the `useCookies` hook
jest.mock('react-cookie', () => ({
  useCookies: jest.fn(),
}));

// Mock the `useNavigate` hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Navbar Integration Test', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders common links', () => {
    // Mock no user logged in
    useCookies.mockReturnValue([{}, jest.fn(), jest.fn()]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check for common links
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  test('renders "Register" and "Login" links when no user is logged in', () => {
    // Mock no user logged in
    useCookies.mockReturnValue([{}, jest.fn(), jest.fn()]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check for "Register" and "Login" links
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders "Workouts" link and "Logout" button when a user is logged in', () => {
    // Mock a logged-in user
    useCookies.mockReturnValue([{ user: { name: 'John Doe' } }, jest.fn(), jest.fn()]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check for "Workouts" link and "Logout" button
    expect(screen.getByText(/Workouts/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('handles logout correctly', () => {
    const mockRemoveCookie = jest.fn();

    // Mock logged-in user and removeCookie function
    useCookies.mockReturnValue([{ user: { name: 'John Doe' } }, jest.fn(), mockRemoveCookie]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Simulate clicking the "Logout" button
    fireEvent.click(screen.getByText(/Logout/i));

    // Check that the cookie is removed
    expect(mockRemoveCookie).toHaveBeenCalledWith('user', { path: '/' });

    // Check that navigate function is called after logout
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
