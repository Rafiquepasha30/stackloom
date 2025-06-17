const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const router = express.Router();

router.post('/assign-course/:studentId', async (req, res) => {
    const { courseId } = req.body;
    try {
        const student = await User.findById(req.params.studentId);
        if (!student || student.role !== 'student') {
            return res.status(400).json({ message: 'Student not found' });
        }

        if (student.selectedCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Course already assigned' });
        }

        student.selectedCourses.push(courseId);
        await student.save();
        res.status(200).json({ message: 'Course assigned successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/students', async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/assign-trainer/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const { trainerId } = req.body;
  
    try {
      const student = await User.findById(studentId);
      if (!student || student.role !== 'student') {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      student.assignedTrainer = trainerId; // 👈 Save trainer's id inside student
      await student.save();
  
      res.json({ message: 'Trainer assigned successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  // Get students assigned to a specific trainer
  router.get('/assigned-students/:trainerId', async (req, res) => {
    const { trainerId } = req.params;
  
    try {
      const students = await User.find({ assignedTrainer: trainerId, role: 'student' })
        .populate('selectedCourses');  // 💥 populate assigned courses
  
      res.json(students);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  
  
  
router.get('/my-courses/:studentId', async (req, res) => {
    try {
        const student = await User.findById(req.params.studentId).populate('selectedCourses');
        res.status(200).json(student.selectedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
