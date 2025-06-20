import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrainerPanel.css'

const TrainerPanel = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchAssignedStudents = async () => {
      try {
        const trainerId = localStorage.getItem('id'); // trainer id
        const token = localStorage.getItem('token');  // token
        if (!trainerId) {
          alert('Trainer ID not found!');
          return;
        }
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/student/assigned-students/${trainerId}`, {
          headers: { Authorization: token }
        });
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching assigned students:', error);
      }
    };

    fetchAssignedStudents();
  }, []);

  return (
    <div className="trainer-panel">
      <h2>Trainer Dashboard</h2>
      <h4>Assigned Students</h4>
      {students.length > 0 ? (
        <div className="students-list">
        <ul>
          {students.map(student => (
            <li key={student._id}>
              <div>
                <strong>{student.name}</strong> <span>{student.email}</span>
                <div className="assigned-courses">
                  {student.selectedCourses.length > 0 ? (
                    student.selectedCourses.map(course => (
                      <div key={course._id} className="course-badge">
                        {course.title}
                      </div>
                    ))
                  ) : (
                    <small>No courses assigned</small>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      ) : (
        <p>No students assigned yet.</p>
      )}
    </div>
  );
};

export default TrainerPanel;
