const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

router.get("/", async (req, res) => {
    try {
        const workouts = await Workout.find().populate("title", "description");
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate("name description", "exercises");
        if (!workout) return res.status(404).json({ message: "Workout not found" });
        res.json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkout) return res.status(404).json({ message: "Workout not found" });
        res.json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/add", async (req, res) => {
    try {
        const newWorkout = new Workout({ ...req.body });
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        if (!deletedWorkout) return res.status(404).json({ message: "Workout not found" });
        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;