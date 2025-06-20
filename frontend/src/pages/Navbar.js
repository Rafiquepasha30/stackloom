import { Navbar, Nav, Container } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "../assests/new_logo2.png";
import './Navbar.css'

const SharedNavbar = () => {
  return (
    <>
      <div className="top-bar bg-light py-2 d-none d-lg-flex justify-content-between px-4">
        <div>
          <span className="me-4">
            📞{" "}
            <a href="tel:8888888888" className="text-dark text-decoration-none">
              888888888
            </a>
          </span>
          <span>
            ✉️{" "}
            <a
              href="mailto:stackloom@gmail.com"
              className="text-dark text-decoration-none"
            >
              stackloom@gmail.com
            </a>
          </span>
        </div>
        <div>
          <a href="/login" className="text-dark text-decoration-none me-3">
            Student Login
          </a>{" "}
          |
          <a href="#" className="text-dark text-decoration-none ms-3">
            Enquire Now
          </a>
        </div>
      </div>

      <Navbar expand="lg" bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">
            <img src={Logo} alt="Logo" height="65" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/" className="fw-bold text-dark">
                Home
              </Nav.Link>
              <Nav.Link href="/about" className="fw-bold text-dark">
                About
              </Nav.Link>
              <Nav.Link href="/courses" className="fw-bold text-dark">
                Courses
              </Nav.Link>
              <Nav.Link href="#" className="fw-bold text-dark">
                Job Openings
              </Nav.Link>
              <Nav.Link href="#" className="fw-bold text-dark">
                Gallery
              </Nav.Link>
              <Nav.Link href="#" className="fw-bold text-dark">
                Placed Students
              </Nav.Link>
              <Nav.Link href="#" className="fw-bold text-dark">
                Blogs
              </Nav.Link>
              <Nav.Link href="#" className="fw-bold text-dark">
                Contact Us
              </Nav.Link>
            </Nav>
            <div className="d-none d-lg-flex">
              <a href="#" className="text-dark me-3">
                <FaInstagram />
              </a>
              <a href="#" className="text-dark me-3">
                <FaFacebookF />
              </a>
              <a href="#" className="text-dark me-3">
                <FaGoogle />
              </a>
              <a href="#" className="text-dark">
                <FaYoutube />
              </a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default SharedNavbar;
