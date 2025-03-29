const mongoose = require("mongoose");

// new mongoose model for workouts

const WorkoutSchema = new mongoose.Schema({
    title:       { type: String, required: true },
    description: { type: String },
    user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercises:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
  }, { timestamps: true });
  

module.exports = mongoose.model("Workout", WorkoutSchema);    