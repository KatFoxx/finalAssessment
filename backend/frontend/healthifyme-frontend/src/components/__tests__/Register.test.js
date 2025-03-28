import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Login from '../Login';

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

describe('Login Component', () => {
  const mockSetCookie = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useCookies.mockReturnValue([{}, mockSetCookie]);
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  it('renders the login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('updates input fields on change', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate typing in the username field
    const usernameInput = screen.getByLabelText(/Username:/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');

    // Simulate typing in the password field
    const passwordInput = screen.getByLabelText(/Password:/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('submits the form and handles login successfully', async () => {
    // Mock the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ username: 'testuser', token: '12345' }),
      })
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate typing in the form fields
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the fetch call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'testuser', password: 'password123' }),
        }
      );
    });

    // Check that the cookie is set
    expect(mockSetCookie).toHaveBeenCalledWith('user', { username: 'testuser', token: '12345' }, { path: '/' });

    // Check that navigation occurs
    expect(mockNavigate).toHaveBeenCalledWith('/workout');
  });

  it('handles login failure gracefully', async () => {
    // Mock the fetch API to simulate a failed login
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid credentials' }),
      })
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate typing in the form fields
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'wrongpassword' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the fetch call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'wronguser', password: 'wrongpassword' }),
        }
      );
    });

    // Check that the cookie is not set
    expect(mockSetCookie).not.toHaveBeenCalled();

    // Check that navigation does not occur
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});