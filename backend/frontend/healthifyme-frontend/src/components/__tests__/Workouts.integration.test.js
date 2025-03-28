import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { CookiesProvider } from 'react-cookie';
import WorkoutsRedux from '../WorkoutsRedux'; // Adjust the path if needed
import workoutReducer from '../../redux/reducers/workoutReducer';

// Create a minimal test store with an initial state for the workout slice.
const createTestStore = (initialState) =>
  configureStore({
    reducer: { workout: workoutReducer },
    preloadedState: initialState,
  });

describe('Workouts Component - Basic Integration Test', () => {
  let store;

  beforeEach(() => {
    store = createTestStore({
      workout: {
        workouts: [],
        loading: false,
        error: null,
      },
    });
  });

  it('renders the Create a Workout heading', () => {
    render(
      <CookiesProvider>
        <Provider store={store}>
          <WorkoutsRedux />
        </Provider>
      </CookiesProvider>
    );
    // Verify that the heading for creating a workout is rendered.
    expect(screen.getByText(/Create a Workout/i)).toBeInTheDocument();
  });
});
