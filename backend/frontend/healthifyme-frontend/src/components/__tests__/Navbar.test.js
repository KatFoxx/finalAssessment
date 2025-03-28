import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { useCookies } from 'react-cookie';
import WorkoutsRedux from '../WorkoutsRedux';
import { fetchWorkoutsRequest } from '../../redux/actions/workoutActions';

// Mock `useCookies` hook
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: jest.fn(),
}));

// Mock Redux action
jest.mock('../../redux/actions/workoutActions', () => ({
  fetchWorkoutsRequest: jest.fn(),
}));

const mockStore = configureStore([thunk]);

describe('WorkoutsRedux Integration Test', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    useCookies.mockReturnValue([{ user: { id: 'user123' } }, jest.fn()]);
    store = mockStore({
      workout: {
        workouts: [
          {
            _id: 'workout1',
            title: 'Morning Workout',
            description: 'A great way to start the day',
            exercises: [{ _id: 'exercise1', name: 'Push-Up' }],
          },
        ],
        loading: false,
        error: null,
      },
    });
  });

  it('fetches and displays workouts from the Redux store', async () => {
    render(
      <Provider store={store}>
        <WorkoutsRedux />
      </Provider>
    );

    // Check if the workout is displayed
    expect(screen.getByText(/Morning Workout/i)).toBeInTheDocument();
    expect(screen.getByText(/A great way to start the day/i)).toBeInTheDocument();

    // Simulate clicking "Show Exercises"
    fireEvent.click(screen.getByText(/Show Exercises/i));

    // Check if the exercise is displayed
    expect(screen.getByText(/Push-Up/i)).toBeInTheDocument();
  });

  it('dispatches the fetchWorkoutsRequest action on load', () => {
    render(
      <Provider store={store}>
        <WorkoutsRedux />
      </Provider>
    );

    // Check if the fetchWorkoutsRequest action was dispatched
    expect(fetchWorkoutsRequest).toHaveBeenCalledWith('user123');
  });
});