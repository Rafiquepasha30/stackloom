import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import './ViewCourse.css';

const ViewCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!course) {
    return <p className="text-center mt-5">Loading course details...</p>;
  }

  return (
    <Container className="view-course-container mt-5">
      <Card className="shadow-lg p-4">
        <Card.Img variant="top" src={course.image} className="course-banner" />
        <Card.Body>
          <Card.Title className="mb-3">{course.title}</Card.Title>
          <Card.Text><strong>Category:</strong> {course.category}</Card.Text>
          <Card.Text><strong>Price:</strong> ₹{course.price}</Card.Text>
          <Card.Text><strong>Description:</strong></Card.Text>
          <Card.Text>{course.description}</Card.Text>
          {/* Optional future section: You can show session sheet, resources etc here */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewCourse;
