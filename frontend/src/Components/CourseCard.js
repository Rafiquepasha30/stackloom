import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash, FaInfoCircle } from "react-icons/fa";
import './Courses.css'

const CourseCard = ({ course, onDelete, showAdminControls }) => {
  return (
    <Card className="shadow-sm course-card">
      <Card.Img variant="top" src={course.image} className="course-image" />
      <Card.Body>
        <h5 className="course-title">{course.title}</h5>
        <p className="course-description">{course.description}</p>
        <h6 className="course-price">₹ {course.price}</h6>
        <div className="d-flex justify-content-between">
          {showAdminControls ? (
            <>
              <Button variant="danger" onClick={() => onDelete(course._id)}>
                <FaTrash /> Delete
              </Button>
              <Button variant="warning">
                Update
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary">
                Buy
              </Button>
              <Button variant="outline-secondary">
                <FaInfoCircle /> Learn More
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
