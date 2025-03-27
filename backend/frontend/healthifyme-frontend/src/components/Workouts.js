import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Workouts = () => {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [expandedWorkout, setExpandedWorkout] = useState(null); // Tracks which workout is expanded
  const [message, setMessage] = useState('');
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/exercises/`);
        const data = await response.json();

        if (response.ok) {
          setExercises(data);
        }
      } catch (error) {
        console.log("error:", error.message);
      }
    };

    const fetchWorkouts = async () => {
      try {
        const userId = cookies.user?.id; // Retrieve user ID from cookies
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/api/workouts?user=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setWorkouts(data);
        }
      } catch (error) {
        console.log("error:", error.message);
      }
    };

    fetchExercises();
    fetchWorkouts();
  }, [cookies]);

  const handleExerciseSelect = (exerciseId) => {
    if (!selectedExercises.includes(exerciseId)) {
      setSelectedExercises([...selectedExercises, exerciseId]);
    } else {
      setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
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
      user: cookies.user?.id, // Include user ID from cookies
    };

    try {
      const response = await fetch(`http://localhost:5000/api/workouts/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout),
      });

      if (response.ok) {
        const savedWorkout = await response.json();
        setWorkouts([...workouts, savedWorkout]); // Add the new workout to the list
        setMessage('Workout saved successfully!');
        setWorkoutTitle('');
        setWorkoutDescription('');
        setSelectedExercises([]);
      } else {
        setMessage('Failed to save workout.');
      }
    } catch (error) {
      console.log("error:", error.message);
      setMessage('An error occurred while saving the workout.');
    }
  };

  const toggleWorkoutExercises = (workoutId) => {
    setExpandedWorkout(expandedWorkout === workoutId ? null : workoutId);
  };

  return (
    <div className="container mt-4">
      <h2>Create a Workout</h2>
      <div className="mb-3">
        <label htmlFor="workoutTitle" className="form-label">Workout Title</label>
        <input
          type="text"
          id="workoutTitle"
          className="form-control"
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
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
        {exercises.map(exercise => (
          <div key={exercise._id} className="col-md-4">
            <div className={`card mb-3 ${selectedExercises.includes(exercise._id) ? 'border-primary' : ''}`}>
              <img src="https://via.placeholder.com/150" className="card-img-top" alt={exercise.name} />
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
      <button className="btn btn-success mt-3" onClick={handleSaveWorkout}>Save Workout</button>
      {message && <div className="alert alert-info mt-3">{message}</div>}

      <h2 className="mt-5">Saved Workouts</h2>
      <div className="row">
        {workouts.map(workout => (
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
                    {workout.exercises.map(exercise => (
                      <li key={exercise._id}>{exercise.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;