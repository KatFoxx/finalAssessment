const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    difficulty: { type: String, required: true },
    category: { type: String, required: true },
    weight: { type: Number },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);