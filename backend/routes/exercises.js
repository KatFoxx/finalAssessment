const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

router.get("/", async (req, res) => {
    try {
        const exercises = await Exercise.find().populate("name", "description", "category", "muscleGroups");
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id).populate("name description", "category");
        if (!exercise) return res.status(404).json({ message: "Exercise not found" });
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExercise) return res.status(404).json({ message: "Exercise not found" });
        res.json(updatedExercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/add", async (req, res) => {
    try {
        const newExercise = new Exercise({ ...req.body });
        const savedExercise = await newExercise.save();
        res.status(201).json(savedExercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
        if (!deletedExercise) return res.status(404).json({ message: "Exercise not found" });
        res.json({ message: "Exercise deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;