export const FETCH_WORKOUTS_REQUEST = 'FETCH_WORKOUTS_REQUEST';
export const FETCH_WORKOUTS_SUCCESS = 'FETCH_WORKOUTS_SUCCESS';
export const FETCH_WORKOUTS_FAILURE = 'FETCH_WORKOUTS_FAILURE';

export const fetchWorkoutsRequest = (userId) => ({
  type: FETCH_WORKOUTS_REQUEST,
  payload: userId,
});

export const fetchWorkoutsSuccess = (workouts) => ({
  type: FETCH_WORKOUTS_SUCCESS,
  payload: workouts,
});

export const fetchWorkoutsFailure = (error) => ({
  type: FETCH_WORKOUTS_FAILURE,
  payload: error,
});