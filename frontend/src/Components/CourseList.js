import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../Components/CourseCard";
import { Container, Row, Col, Dropdown } from "react-bootstrap";

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

  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses`)
      .then((response) => setCourses(response.data))
      .catch((error) => console.log(error));
  }, []);

  const deleteCourse = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/courses/${id}`)
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

      {/* Filter Dropdown */}
      <div className="text-center mb-4">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="filter-dropdown">
            Filter: {selectedCategory}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Courses Grid */}
      <Row>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Col key={course._id} md={4} className="mb-4">
              <CourseCard
                course={course}
                onDelete={deleteCourse}
                role={role}
              />
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
