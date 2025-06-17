import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './AdminPanel.css';

const AdminPanel = () => {
  // --- Add Course States ---
  const [course, setCourse] = useState({ title: '', description: '', price: '', category: '', image: '' });

  // --- Assign Course States ---
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // --- Create Admin States ---
  const [admin, setAdmin] = useState({ name: '', email: '', password: '' });

  // --- Fetch students & courses on mount ---
  useEffect(() => {
    axios.get('http://localhost:5000/student/students')
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  // --- Add Course Handlers ---
  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/courses/add', course)
      .then(() => {
        alert('✅ Course Added Successfully!');
        // Refresh course list
        axios.get('http://localhost:5000/courses')
          .then(res => setCourses(res.data));
        // Reset form
        setCourse({ title: '', description: '', price: '', category: '', image: '' });
      })
      .catch(error => console.log(error));
  };

  // --- Assign Course Handler ---
  const assignCourse = () => {
    if (!selectedStudent || !selectedCourse) {
      alert('⚠️ Please select both student and course!');
      return;
    }

    axios.post(`http://localhost:5000/student/assign-course/${selectedStudent}`, { courseId: selectedCourse })
      .then(res => alert(`✅ ${res.data.message}`))
      .catch(err => alert(`❌ ${err.response.data.message}`));
  };

  // --- Create Admin Handlers ---
  const handleAdminChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Admin token
    axios.post('http://localhost:5000/auth/create-admin', admin, {
      headers: { Authorization: token }
    })
      .then(res => {
        alert(`✅ ${res.data.message}`);
        setAdmin({ name: '', email: '', password: '' });
      })
      .catch(err => alert(`❌ ${err.response.data.message}`));
  };

  return (
    <Container className="mt-4 mb-5">
      {/* --- Add Course Section --- */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">📚 Add New Course</Card.Title>
          <Form onSubmit={handleCourseSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={course.title} onChange={handleCourseChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={course.description} onChange={handleCourseChange} required />
            </Form.Group>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" value={course.price} onChange={handleCourseChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" name="category" value={course.category} onChange={handleCourseChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control type="text" name="image" value={course.image} onChange={handleCourseChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">Add Course</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* --- Assign Course Section --- */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">🧑‍🎓 Assign Course to Student</Card.Title>
          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Select Student</Form.Label>
                <Form.Control as="select" onChange={(e) => setSelectedStudent(e.target.value)}>
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student._id} value={student._id}>{student.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Select Course</Form.Label>
                <Form.Control as="select" onChange={(e) => setSelectedCourse(e.target.value)}>
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="success" onClick={assignCourse}>Assign</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* --- Create Admin Section --- */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">🔑 Create New Admin</Card.Title>
          <Form onSubmit={handleAdminSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={admin.name} onChange={handleAdminChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={admin.email} onChange={handleAdminChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={admin.password} onChange={handleAdminChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="danger" type="submit">Create Admin</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminPanel;
