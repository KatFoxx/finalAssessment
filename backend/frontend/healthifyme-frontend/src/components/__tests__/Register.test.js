import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../Register'; // Import your Register component
import { CookiesProvider } from 'react-cookie'; // We need the CookiesProvider to mock cookie usage.
import { MemoryRouter } from 'react-router-dom';

// Mock fetch to simulate network responses
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('renders the register form correctly', () => {
  render(
    <CookiesProvider>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </CookiesProvider>
  );

  // Check if the form elements are rendered
  expect(screen.getByLabelText('Name:', { exact: true })).toBeInTheDocument();
  expect(screen.getByLabelText('Email:', { exact: true })).toBeInTheDocument();
  expect(screen.getByLabelText('Username:', { exact: true })).toBeInTheDocument();
  expect(screen.getByLabelText('Password:', { exact: true })).toBeInTheDocument();
  expect(screen.getByLabelText('Repeat Password:', { exact: true })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Register User/i })).toBeInTheDocument();
});

test('updates input fields on change', () => {
  render(
    <CookiesProvider>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </CookiesProvider>
  );

  // Simulate typing in the input fields
  fireEvent.change(screen.getByLabelText('Name:', { exact: true }), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText('Email:', { exact: true }), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByLabelText('Username:', { exact: true }), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByLabelText('Password:', { exact: true }), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Repeat Password:', { exact: true }), { target: { value: 'password123' } });

  // Assert that input fields have updated values
  expect(screen.getByLabelText('Name:', { exact: true }).value).toBe('John Doe');
  expect(screen.getByLabelText('Email:', { exact: true }).value).toBe('john@example.com');
  expect(screen.getByLabelText('Username:', { exact: true }).value).toBe('johndoe');
  expect(screen.getByLabelText('Password:', { exact: true }).value).toBe('password123');
  expect(screen.getByLabelText('Repeat Password:', { exact: true }).value).toBe('password123');
});

test('shows error message when passwords do not match', async () => {
  render(
    <CookiesProvider>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </CookiesProvider>
  );

  // Simulate filling the form with mismatched passwords
  fireEvent.change(screen.getByLabelText('Password:', { exact: true }), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Repeat Password:', { exact: true }), { target: { value: 'wrongpassword' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Register User/i }));

  // Check if the error message is displayed
  await waitFor(() => {
    expect(screen.getByText(/Passwords do not match!/i)).toBeInTheDocument();
  });
});

test('submits the form and shows success message', async () => {
  render(
    <CookiesProvider>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </CookiesProvider>
  );

  // Mock the API response for registration
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      msg: 'Registration successful!',
    }),
  });

  // Simulate filling the form
  fireEvent.change(screen.getByLabelText('Name:', { exact: true }), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText('Email:', { exact: true }), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByLabelText('Username:', { exact: true }), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByLabelText('Password:', { exact: true }), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Repeat Password:', { exact: true }), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Register User/i }));

  // Check if the success message is shown
  await waitFor(() => {
    expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument();
  });
});

test('handles registration failure gracefully', async () => {
  render(
    <CookiesProvider>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </CookiesProvider>
  );

  // Mock the API response for registration failure
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({
      msg: 'Something went wrong. Please try again.',
    }),
  });

  // Simulate filling the form
  fireEvent.change(screen.getByLabelText('Name:', { exact: true }), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText('Email:', { exact: true }), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByLabelText('Username:', { exact: true }), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByLabelText('Password:', { exact: true }), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Repeat Password:', { exact: true }), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Register User/i }));

  // Check if the error message is shown
  await waitFor(() => {
    expect(screen.getByText(/Something went wrong. Please try again./i)).toBeInTheDocument();
  });
});
