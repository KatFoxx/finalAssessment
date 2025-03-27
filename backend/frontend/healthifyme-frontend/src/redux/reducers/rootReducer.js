import { combineReducers } from 'redux';
import workoutReducer from './workoutReducer';

const rootReducer = combineReducers({
  workout: workoutReducer,
});

export default rootReducer;