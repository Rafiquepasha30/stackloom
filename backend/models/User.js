const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['student', 'admin', 'trainer'], // <-- Added 'trainer' role
        default: 'student'
    },
    selectedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    assignedTrainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // 👈 Add this field

});

module.exports = mongoose.model('User', userSchema);
