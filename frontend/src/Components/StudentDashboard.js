import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './StudentDashboard.css';



const StudentDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);
  const studentId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/student/my-courses/${studentId}`)
      .then(res => setMyCourses(res.data))
      .catch(err => console.log(err));
  }, [studentId]);

  return (
    <Container className="student-dashboard-container">
      <h2>🛒 My Course Cart</h2>

      {myCourses.length === 0 ? (
        <p className="empty-message">Your cart is empty. No courses assigned yet.</p>
      ) : (
        <Row>
          {myCourses.map(course => (
            <Col md={6} key={course._id} className="mb-4">
              <Card className="cart-card">
                <Card.Body>
                  <Card.Title className="cart-title">{course.title}</Card.Title>
                  <Card.Text className="cart-desc">{course.description}</Card.Text>
                  <Card.Text><strong>Category:</strong> {course.category}</Card.Text>
                  <Card.Text><strong>Price:</strong> ₹{course.price}</Card.Text>
                  <Button variant="primary" disabled>Enrolled</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default StudentDashboard;
