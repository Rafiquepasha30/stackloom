import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../Components/CourseCard";
import { Container, Row, Col, Button } from "react-bootstrap";

const categories = [
  "All",
  "Mechanical",
  "Civil / Architecture",
  "Electrical / Electronics",
  "Special Programs",
  "IT / Computer",
];

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const role = localStorage.getItem("role"); // 👉 Added Line

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.log(error));
  }, []);

  const deleteCourse = (id) => {
    axios
      .delete(`http://localhost:5000/courses/${id}`)
      .then(() => setCourses(courses.filter((course) => course._id !== id)))
      .catch((error) => console.log(error));
  };

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Our Courses</h2>

      {/* Category Filter */}
      <div className="d-flex justify-content-center mb-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Courses Grid */}
      <Row>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Col key={course._id} md={4} className="mb-4">
              {/* 👉 Passing role here */}
              <CourseCard course={course} onDelete={deleteCourse} role={role} />
            </Col>
          ))
        ) : (
          <p className="text-center">No courses available in this category.</p>
        )}
      </Row>
    </Container>
  );
};

export default CourseList;
