import React from 'react';

const Workouts = () => {
  // Dummy data for exercises
  const exercises = [
    { id: 1, name: 'Push-up', type: 'Strength', muscleGroups: 'Chest, Triceps' },
    { id: 2, name: 'Running', type: 'Cardio', muscleGroups: 'Legs, Core' },
    // ... add more exercises
  ];

  return (
    <div className="container mt-4">
      <h2>Exercises</h2>
      <div className="row">
        {exercises.map(exercise => (
          <div key={exercise.id} className="col-md-4">
            <div className="card mb-3">
              <img src="https://via.placeholder.com/150" className="card-img-top" alt={exercise.name} />
              <div className="card-body">
                <h5 className="card-title">{exercise.name}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {exercise.type} <br />
                  <strong>Muscle Groups:</strong> {exercise.muscleGroups}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;