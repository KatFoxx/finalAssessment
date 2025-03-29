const mongoose = require('mongoose');

// new Mongoose Model for Exercises.
const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    difficulty: { type: String, required: true },
    category: { type: String, required: true },
    weight: { type: Number },
    muscleGroups: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);