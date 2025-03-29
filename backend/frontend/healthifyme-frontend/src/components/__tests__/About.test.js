import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Component', () => {
  it('renders the heading and content correctly', () => {
    render(<About />);

    // Check if the heading is rendered
    expect(screen.getByText(/About HealthifyMe/i)).toBeInTheDocument();

    // Check if the paragraph content is rendered
    expect(
      screen.getByText(/Here at HealthifyMe we believe in the power of Lorem ipsum/i)
    ).toBeInTheDocument();
  });
});