const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
// Importing the Exercise model allows interaction with the database to perform CRUD operations on exercises.

router.get("/", async (req, res) => {
    try {
        // Fetch all exercises from the database and populate specific fields for better readability in the response.
        const exercises = await Exercise.find().populate("name", "description", "category", "muscleGroups");
        res.json(exercises);
    } catch (error) {
        // Sending a 500 status code ensures the client knows there was a server-side error.
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        // Fetch a specific exercise by its ID and populate relevant fields for detailed information.
        const exercise = await Exercise.findById(req.params.id).populate("name description", "category");
        if (!exercise) return res.status(404).json({ message: "Exercise not found" });
        // Returning a 404 status code if the exercise is not found provides clear feedback to the client.
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        // Update an existing exercise by its ID with the provided data and return the updated document.
        const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExercise) return res.status(404).json({ message: "Exercise not found" });
        res.json(updatedExercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/add", async (req, res) => {
    try {
        // Create a new exercise using the data provided in the request body.
        const newExercise = new Exercise({ ...req.body });
        const savedExercise = await newExercise.save();
        // Sending a 201 status code indicates that a new resource was successfully created.
        res.status(201).json(savedExercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // Delete an exercise by its ID and return a success message if the operation is successful.
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!deletedExercise) return res.status(404).json({ message: "Exercise not found" });
        res.json({ message: "Exercise deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
// Exporting the router allows this module to be used in the main application file for handling exercise-related routes.