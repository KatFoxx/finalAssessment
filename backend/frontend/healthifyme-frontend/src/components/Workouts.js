import React, { useState, useEffect } from 'react';

const Workouts = () => {
  // Dummy data for exercises
  const [exercises, setExercises] = useState([])
  const api = process.env.API

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${api}/exercises/`);
        const data = await response.json();

        if (response.ok) {
          setExercises(data);
        }
      } catch (error) {
        console.log("error:", error.message);
      }
    };

    fetchExercises();
  }, []);
  
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
                  <strong>Type:</strong> {exercise.category} <br />
                  <strong>Muscle Groups:</strong> {exercise.muscleGroups}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}



export default Workouts;