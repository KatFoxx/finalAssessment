import { configureStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import authReducer from './reducers/authReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({ reducer: {}, auth: authReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware) });

sagaMiddleware.run(rootSaga);

export default store;