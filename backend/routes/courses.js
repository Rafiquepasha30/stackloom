const express = require('express');
const Course = require('../models/Course');
const router = express.Router();
// Add Course
router.post('/add', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Get Courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Update course

// PUT update course by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
});


// Delete Course
router.delete('/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Course deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
