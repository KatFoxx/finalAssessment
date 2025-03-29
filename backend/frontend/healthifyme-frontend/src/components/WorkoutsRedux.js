import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { useCookies } from 'react-cookie';
import { fetchWorkoutsRequest } from '../redux/actions/workoutActions';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Workouts = () => {
  const dispatch = useDispatch(); // Initialize the Redux dispatcher
  const { workouts, loading, error } = useSelector((state) => state.workout); // Access workouts state from Redux

  const [exercises, setExercises] = useState([]);
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [message, setMessage] = useState('');
  const [cookies] = useCookies(['user']);
  // Fetch Workouts on Mounting of the Component
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/exercises/`);
        const data = await response.json();

        if (response.ok) {
          setExercises(data);
        }
      } catch (error) {
        console.log('error:', error.message);
      }
    };

    // Dispatch the Redux action to fetch workouts
    const userId = cookies.user?.id; // Retrieve user ID from cookies
    if (userId) {
      dispatch(fetchWorkoutsRequest(userId)); // Dispatch the action
    }

    fetchExercises();
  }, [dispatch, cookies]);

  const handleExerciseSelect = (exerciseId) => {
    if (!selectedExercises.includes(exerciseId)) {
      setSelectedExercises([...selectedExercises, exerciseId]);
    } else {
      setSelectedExercises(selectedExercises.filter((id) => id !== exerciseId));
    }
  };

  const handleSaveWorkout = async () => {
    if (!workoutTitle || selectedExercises.length === 0) {
      setMessage('Please provide a workout title and select at least one exercise.');
      return;
    }

    const newWorkout = {
      title: workoutTitle,
      description: workoutDescription,
      exercises: selectedExercises,
      user: cookies.user?.id, 
    };

    try {
      const response = await fetch(`${API_BASE_URL}/workouts/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout),
      });

      if (response.ok) {
        await response.json();
        setMessage('Workout saved successfully!');
        setWorkoutTitle('');
        setWorkoutDescription('');
        setSelectedExercises([]);

        // Dispatch the action to fetch workouts again
        const userId = cookies.user?.id;
        if (userId) {
          dispatch(fetchWorkoutsRequest(userId));
        }
      } else {
        setMessage('Failed to save workout.');
      }
    } catch (error) {
      console.log('error:', error.message);
      setMessage('An error occurred while saving the workout.');
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Workout deleted successfully!');
        // Dispatch the action to fetch workouts again
        const userId = cookies.user?.id;
        if (userId) {
          dispatch(fetchWorkoutsRequest(userId));
        }
      } else {
        setMessage('Failed to delete workout.');
      }
    } catch (error) {
      console.log('error:', error.message);
      setMessage('An error occurred while deleting the workout.');
    }
  };

  const toggleWorkoutExercises = (workoutId) => {
    setExpandedWorkout(expandedWorkout === workoutId ? null : workoutId);
  };

  return (
    <div className="container mt-4">
      <h2>Create a Workout</h2>
      <div className="workout">
        <label htmlFor="workoutTitle" className="form-label">Workout Title</label>
        <input
          type="text"
          id="workoutTitle"
          className="form-control"
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
        />
      </div>
      <div className="workout">
        <label htmlFor="workoutDescription" className="form-label">Workout Description</label>
        <textarea
          id="workoutDescription"
          className="form-control"
          value={workoutDescription}
          onChange={(e) => setWorkoutDescription(e.target.value)}
        />
      </div>
      <h3>Select Exercises</h3>
      <div className="row">
        {exercises.map((exercise) => (
          <div key={exercise._id} className="col-md-4">
            <div className={`card mb-3 ${selectedExercises.includes(exercise._id) ? 'border-primary' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{exercise.name}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {exercise.category} <br />
                  <strong>Muscle Groups:</strong> {exercise.muscleGroups}
                </p>
                <button
                  className={`btn ${selectedExercises.includes(exercise._id) ? 'btn-danger' : 'btn-primary'}`}
                  onClick={() => handleExerciseSelect(exercise._id)}
                >
                  {selectedExercises.includes(exercise._id) ? 'Remove' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn save" onClick={handleSaveWorkout}>Save Workout</button>
      {message && <div className="alert alert-info mt-3">{message}</div>}

      <h2 className="mt-5">Saved Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p>Error: {error}</p>}
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">{workout.description}</p>
                <p className="card-text">
                  <strong>Exercises:</strong> {workout.exercises.length}
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleWorkoutExercises(workout._id)}
                >
                  {expandedWorkout === workout._id ? 'Hide Exercises' : 'Show Exercises'}
                </button>
                {expandedWorkout === workout._id && (
                  <ul className="mt-3">
                    {workout.exercises.map((exercise) => (
                      <li key={exercise._id}>{exercise.name}</li>
                    ))}
                  </ul>
                )}
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDeleteWorkout(workout._id)}
                >
                  Delete Workout
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;