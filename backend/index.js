const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/courses'); // ADD THIS LINE


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/uploads', express.static('uploads'));



app.listen(5000, () => console.log('Server running on port 5000'));
