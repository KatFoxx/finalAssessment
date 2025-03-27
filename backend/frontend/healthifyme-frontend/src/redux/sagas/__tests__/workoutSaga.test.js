import { runSaga } from 'redux-saga';
import axios from 'axios';
import { fetchWorkoutsSaga } from '../workoutSaga';
import { fetchWorkoutsSuccess, fetchWorkoutsFailure } from '../../actions/workoutActions';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('fetchWorkoutsSaga', () => {
  const API = process.env.API || 'http://localhost:5000';

  it('should dispatch success action when API call is successful', async () => {
    const dispatchedActions = [];
    const mockWorkouts = [{ id: 1, title: 'Workout 1' }];

    // Mock successful API response
    axios.get.mockResolvedValueOnce({ data: mockWorkouts });

    await runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      fetchWorkoutsSaga, // Pass the generator function
      { payload: 'userId123' } // Pass the action payload
    ).toPromise();

    expect(axios.get).toHaveBeenCalledWith(`${API}/api/workouts?user=userId123`);
    expect(dispatchedActions).toContainEqual(fetchWorkoutsSuccess(mockWorkouts));
  });

  it('should dispatch failure action when API call fails', async () => {
    const dispatchedActions = [];
    const errorMessage = 'API error';

    // Mock failed API response
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    await runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      fetchWorkoutsSaga, // Pass the generator function
      { payload: 'userId123' } // Pass the action payload
    ).toPromise();

    expect(axios.get).toHaveBeenCalledWith(`${API}/api/workouts?user=userId123`);
    expect(dispatchedActions).toContainEqual(fetchWorkoutsFailure(errorMessage));
  });
});