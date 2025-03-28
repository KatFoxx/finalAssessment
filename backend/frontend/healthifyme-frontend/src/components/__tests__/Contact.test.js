import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact Component', () => {

    it('should render the form fields correctly', () => {
        render(<Contact />);

        // Check if the form elements are rendered correctly
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should update the state when input fields change', () => {
        render(<Contact />);

        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const messageInput = screen.getByLabelText(/message/i);

        // Simulate user input
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'Hello there!' } });

        // Check if the state is updated
        expect(nameInput.value).toBe('John Doe');
        expect(emailInput.value).toBe('john@example.com');
        expect(messageInput.value).toBe('Hello there!');
    });

    it('should display a success message after form submission', async () => {
        render(<Contact />);

        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const messageInput = screen.getByLabelText(/message/i);
        const submitButton = screen.getByRole('button', { name: /send message/i });

        // Simulate user input
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'Hello there!' } });

        // Simulate form submission
        fireEvent.click(submitButton);

        // Wait for success message to appear
        await waitFor(() => {
            expect(screen.getByText(/message sent!/i)).toBeInTheDocument();
        });

        // Check that input fields are cleared after submission
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(messageInput.value).toBe('');
    });

});