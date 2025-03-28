import workoutReducer from '../workoutReducer';
import {
  FETCH_WORKOUTS_REQUEST,
  FETCH_WORKOUTS_SUCCESS,
  FETCH_WORKOUTS_FAILURE,
} from '../../actions/workoutActions';

describe('workoutReducer', () => {
  const initialState = {
    workouts: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(workoutReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_WORKOUTS_REQUEST', () => {
    const action = { type: FETCH_WORKOUTS_REQUEST };
    const expectedState = { ...initialState, loading: true };
    expect(workoutReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_WORKOUTS_SUCCESS', () => {
    const action = { type: FETCH_WORKOUTS_SUCCESS, payload: [{ id: 1, title: 'Workout 1' }] };
    const expectedState = { ...initialState, workouts: action.payload, loading: false };
    expect(workoutReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_WORKOUTS_FAILURE', () => {
    const action = { type: FETCH_WORKOUTS_FAILURE, payload: 'Error fetching workouts' };
    const expectedState = { ...initialState, error: action.payload, loading: false };
    expect(workoutReducer(initialState, action)).toEqual(expectedState);
  });
});