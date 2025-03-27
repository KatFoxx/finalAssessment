import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_WORKOUTS_REQUEST,
  fetchWorkoutsSuccess,
  fetchWorkoutsFailure,
} from '../actions/workoutActions';

function* fetchWorkoutsSaga(action) {
  try {
    const response = yield call(axios.get, `http://localhost:5000/api/workouts?user=${action.payload}`);
    yield put(fetchWorkoutsSuccess(response.data));
  } catch (error) {
    yield put(fetchWorkoutsFailure(error.message));
  }
}

export default function* workoutSaga() {
  yield takeLatest(FETCH_WORKOUTS_REQUEST, fetchWorkoutsSaga);
}