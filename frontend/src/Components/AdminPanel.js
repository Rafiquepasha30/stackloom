import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("add"); // Sidebar navigation
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState({ name: "", email: "", password: "" });
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedStudentForTrainer, setSelectedStudentForTrainer] =
    useState("");

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchTrainers();
  }, []);

  const fetchCourses = () => {
    axios
      .get("http://localhost:5000/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  };

  const fetchTrainers = () => {
    axios
      .get("http://localhost:5000/auth/trainers")
      .then((res) => setTrainers(res.data))
      .catch((err) => console.log(err));
  };

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/student/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
  const handleTrainerChange = (e) => {
    setTrainer({ ...trainer, [e.target.name]: e.target.value });
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      axios
        .put(`http://localhost:5000/courses/${course._id}`, course)
        .then(() => {
          alert("Course Updated");
          resetCourseForm();
        });
    } else {
      axios.post("http://localhost:5000/courses/add", course).then(() => {
        alert("Course Added");
        resetCourseForm();
      });
    }
  };
  const handleTrainerSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Admin token
    axios
      .post("http://localhost:5000/auth/create-trainer", trainer, {
        headers: { Authorization: token },
      })
      .then((res) => {
        alert(`✅ ${res.data.message}`);
        setTrainer({ name: "", email: "", password: "" }); // Clear form
      })
      .catch((err) => alert(`❌ ${err.response.data.message}`));
  };

  const resetCourseForm = () => {
    setCourse({
      title: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    setEditing(false);
    fetchCourses();
  };

  const handleEdit = (c) => {
    setCourse(c);
    setEditing(true);
    setActiveSection("add");
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/courses/${courseToDelete}`).then(() => {
      alert("Deleted");
      fetchCourses();
    });
    setShowDeleteModal(false);
  };

  const assignCourse = () => {
    if (!selectedStudent || !selectedCourse)
      return alert("Select student and course!");
    axios
      .post(`http://localhost:5000/student/assign-course/${selectedStudent}`, {
        courseId: selectedCourse,
      })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response.data.message));
  };

  const assignTrainer = () => {
    if (!selectedStudentForTrainer || !selectedTrainer) {
      alert("⚠️ Please select both student and trainer!");
      return;
    }

    axios
      .post(
        `http://localhost:5000/student/assign-trainer/${selectedStudentForTrainer}`,
        { trainerId: selectedTrainer }
      )
      .then((res) => alert(`✅ ${res.data.message}`))
      .catch((err) => alert(`❌ ${err.response.data.message}`));
  };

  const handleAdminChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/auth/create-admin", admin, {
        headers: { Authorization: token },
      })
      .then((res) => {
        alert(res.data.message);
        setAdmin({ name: "", email: "", password: "" });
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar bg-dark text-white p-3">
          <h4 className="text-center mb-4">Admin Dashboard</h4>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setActiveSection("add")}
          >
            Add New Course
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setActiveSection("manage")}
          >
            Manage Courses
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setActiveSection("assign")}
          >
            Assign Course
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setActiveSection("admin")}
          >
            Create Admin
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setActiveSection("adminto")}
          >
            Assign Trainer
          </Button>
          <Button
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => setActiveSection("trainer")}
          >
            Create Trainer
          </Button>
        </Col>

        <Col md={10} className="p-4">
          {activeSection === "add" && (
            <>
              <h3>{editing ? "Edit Course" : "Add New Course"}</h3>
              <Form onSubmit={handleCourseSubmit}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        value={course.title}
                        onChange={handleCourseChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        name="category"
                        value={course.category}
                        onChange={handleCourseChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mt-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={course.description}
                    onChange={handleCourseChange}
                    as="textarea"
                    required
                  />
                </Form.Group>
                <Row className="mt-2">
                  <Col>
                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        name="price"
                        value={course.price}
                        onChange={handleCourseChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        name="image"
                        value={course.image}
                        onChange={handleCourseChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                
                <Button
                  className="mt-3"
                  type="submit"
                  variant={editing ? "warning" : "primary"}
                >
                  {editing ? "Update" : "Add"} Course
                </Button>
              </Form>
            </>
          )}

          {activeSection === "manage" && (
            <>
              <h3>Manage Courses</h3>
              <Row>
                {courses.map((c) => (
                  <Col md={4} key={c._id}>
                    <Card className="mb-4">
                      <Card.Img src={c.image} height="180" />
                      <Card.Body>
                        <Card.Title>{c.title}</Card.Title>
                        <Card.Text>{c.description}</Card.Text>
                        <Button variant="warning" onClick={() => handleEdit(c)}>
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setCourseToDelete(c._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {activeSection === "assign" && (
            <>
              <h3>Assign Course to Student</h3>
              <Row>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Student</Form.Label>
                    <Form.Select
                      onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                      <option>Select student</option>
                      {students.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group>
                    <Form.Label>Course</Form.Label>
                    <Form.Select
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                      <option>Select course</option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Button variant="success" onClick={assignCourse}>
                    Assign
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {activeSection === "adminto" && (
            <>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="mb-3">
                    Assign Student to Trainer
                  </Card.Title>
                  <Row>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>Select Student</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(e) =>
                            setSelectedStudentForTrainer(e.target.value)
                          }
                        >
                          <option value="">Select Student</option>
                          {students.map((student) => (
                            <option key={student._id} value={student._id}>
                              {student.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>Select Trainer</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(e) => setSelectedTrainer(e.target.value)}
                        >
                          <option value="">Select Trainer</option>
                          {trainers.map((trainer) => (
                            <option key={trainer._id} value={trainer._id}>
                              {trainer.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button variant="info" onClick={assignTrainer}>
                        Assign
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </>
          )}

          {activeSection === "trainer" && (
            <>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Card.Title className="mb-3">
                    Create New Trainer
                  </Card.Title>
                  <Form onSubmit={handleTrainerSubmit}>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={trainer.name}
                            onChange={handleTrainerChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={trainer.email}
                            onChange={handleTrainerChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={trainer.password}
                            onChange={handleTrainerChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="success" type="submit">
                      Create Trainer
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </>
          )}
          {activeSection === "admin" && (
            <>
              <h3>Create Admin</h3>
              <Form onSubmit={handleAdminSubmit}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name="name"
                        value={admin.name}
                        onChange={handleAdminChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={admin.email}
                        onChange={handleAdminChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={admin.password}
                        onChange={handleAdminChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button className="mt-3" variant="danger" type="submit">
                  Create Admin
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
