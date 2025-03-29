const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
// Importing the Workout model allows interaction with the database to perform CRUD operations on workout data.

router.get("/", async (req, res) => {
    try {
        const { user } = req.query;
        const query = user ? { user } : {};
        // If a `user` query parameter is provided, filter workouts by user; otherwise, fetch all workouts.
        const workouts = await Workout.find(query).populate("exercises");
        // Populating the "exercises" field ensures that detailed exercise data is included in the response.
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
        // Sending a 500 status code informs the client that a server-side error occurred.
    }
});

router.get("/:id", async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate("name description", "exercises");
        // Fetch a specific workout by its ID and populate relevant fields for detailed information.
        if (!workout) return res.status(404).json({ message: "Workout not found" });
        // Returning a 404 status code if the workout is not found provides clear feedback to the client.
        res.json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Update an existing workout by its ID with the provided data and return the updated document.
        if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });
        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/add", async (req, res) => {
    try {
        const newWorkout = new Workout({ ...req.body });
        // Create a new workout using the data provided in the request body.
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
        // Sending a 201 status code indicates that a new resource was successfully created.
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        // Delete a workout by its ID and return a success message if the operation is successful.
        if (!deletedWorkout) return res.status(404).json({ message: "Workout not found" });
        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
// Exporting the router allows this module to be used in the main application file for handling workout-related routes.