import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_WORKOUTS_REQUEST,
  fetchWorkoutsSuccess,
  fetchWorkoutsFailure,
} from '../actions/workoutActions';

const API = process.env.REACT_APP_API_BASE_URL;

export function* fetchWorkoutsSaga(action) {
  try {
    const response = yield call(axios.get, `${API}/workouts?user=${action.payload}`);
    yield put(fetchWorkoutsSuccess(response.data));
  } catch (error) {
    yield put(fetchWorkoutsFailure(error.message));
  }
}

export default function* workoutSaga() {
  yield takeLatest(FETCH_WORKOUTS_REQUEST, fetchWorkoutsSaga);
}