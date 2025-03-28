const initialState = {
    workouts: [],
    loading: false,
    error: null,
  };
  
  const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_WORKOUTS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_WORKOUTS_SUCCESS':
        return { ...state, loading: false, workouts: action.payload };
      case 'FETCH_WORKOUTS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default workoutReducer;