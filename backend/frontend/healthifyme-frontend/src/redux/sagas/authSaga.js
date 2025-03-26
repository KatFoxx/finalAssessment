import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// Worker saga: will be fired on LOGIN_REQUEST actions
function* loginSaga(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:5000/api/auth/login', action.payload);
    yield put({ type: 'LOGIN_SUCCESS', payload: response.data.token });
  } catch (error) {
    yield put({ type: 'LOGIN_FAILURE', payload: error.response.data.msg });
  }
}

// Watcher saga: watches for actions dispatched to the store, starts worker saga
function* authSaga() {
  yield takeLatest('LOGIN_REQUEST', loginSaga);
}

export default authSaga;
