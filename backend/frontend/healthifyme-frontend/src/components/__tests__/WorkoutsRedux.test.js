import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import configureStore from 'redux-mock-store';
import WorkoutsRedux from '../WorkoutsRedux';

const mockStore = configureStore([]);

describe('WorkoutsRedux Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      workout: {
        workouts: [
          { _id: '1', title: 'Workout 1', description: 'Description 1', exercises: [] },
          { _id: '2', title: 'Workout 2', description: 'Description 2', exercises: [] },
        ],
        loading: false,
        error: null,
      },
    });
  });

  it('renders the component correctly', () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <WorkoutsRedux />
        </CookiesProvider>
      </Provider>
    );

    expect(screen.getByText('Create a Workout')).toBeInTheDocument();
    expect(screen.getByText('Saved Workouts')).toBeInTheDocument();
  });

  it('displays workouts from the Redux store', () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <WorkoutsRedux />
        </CookiesProvider>
      </Provider>
    );

    expect(screen.getByText('Workout 1')).toBeInTheDocument();
    expect(screen.getByText('Workout 2')).toBeInTheDocument();
  });

  it('handles workout creation form submission', () => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <WorkoutsRedux />
        </CookiesProvider>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Workout Title'), { target: { value: 'New Workout' } });
    fireEvent.change(screen.getByLabelText('Workout Description'), { target: { value: 'New Description' } });
    fireEvent.click(screen.getByText('Save Workout'));

    expect(screen.getByText('Please provide a workout title and select at least one exercise.')).toBeInTheDocument();
  });
});