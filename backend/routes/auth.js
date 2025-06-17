const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Verify Admin Role Middleware
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

/* ================= Routes ================= */

// Public Student Register Route (Always student)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'student' // Force role student
    });
    await newUser.save();
    res.status(201).send('Student Registered Successfully!');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

// Trainer Login
// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    // Now check the role (admin/student/trainer)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'SECRET_KEY',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role,
      id: user._id
    });
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

// Create Trainer - Only Admin can do this
router.post('/create-trainer', verifyToken, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Trainer already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTrainer = new User({ name, email, password: hashedPassword, role: 'trainer' });
    await newTrainer.save();

    res.status(201).json({ message: 'Trainer created successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get All Trainers
router.get('/trainers', async (req, res) => {
  try {
    const trainers = await User.find({ role: 'trainer' });
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'SECRET_KEY',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      role: user.role,
      id: user._id
    });
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

// Protected Route: Create Admin (Admin only)
router.post('/create-admin', verifyToken, verifyAdmin, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error: ' + error.message });
  }
});

module.exports = router;
