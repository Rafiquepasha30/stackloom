import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* Courses Offered */}
          <div className="col-md-4 col-sm-12 footer-section">
            <h5 className="footer-title">Stack Loom</h5>
            <hr className="footer-divider" />
            <h6 className="footer-subtitle">Courses We Offer:</h6>
            <ul className="footer-list">
              <li>CAD Design: AutoCAD, SolidWorks, CATIA, Revit</li>
              <li>IT Training: Python, Java, Web Development, Data Science</li>
              <li>Civil Engineering: Structural Design, Quantity Surveying</li>
              <li>Certification Programs</li>
              <li>Professional Development Courses</li>
            </ul>
          </div>

          {/* 📍 Get In Touch Section */}
<div className="col-md-4 col-sm-12 footer-section">
  <h5 className="footer-title">Get In Touch</h5>
  <hr className="footer-divider" />
  <ul className="footer-list contact-list">
    <li>📍 2nd floor, Benz Tower, Near Pune Highway, Wagholi 412207</li>
    <li>📧 StackLoom@gmail.com</li>
    <li>📞 8888888888 | <FaWhatsapp /> 8888888888</li>
    <li>🌐 www.Stackloom.com</li>
  </ul>
</div>

{/* 🌐 Social Media Section */}
<div className="col-md-4 col-sm-12 footer-section">
  <h5 className="footer-title">Follow Us On</h5>
  <hr className="footer-divider" />
  <div className="d-flex gap-3 social-icons">
    <a href="#" className="text-light"><FaFacebookF size={20} /></a>
    <a href="#" className="text-light"><FaInstagram size={20} /></a>
    <a href="#" className="text-light"><FaYoutube size={20} /></a>
    <a href="#" className="text-light"><FaLinkedin size={20} /></a>
  </div>
  <p className="footer-copy mt-3">&copy; 2025 Stack Loom. All Rights Reserved.</p>
</div>


          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
