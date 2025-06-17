import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* Courses Offered */}
          <div className="col-md-4">
            <h5 className="text-uppercase">Stack Loom </h5>
            <hr className="border-light mb-2" />
            <h6>Courses we Offer :</h6>
            <ul className="list-unstyled">
              <li>CAD Design: AutoCAD, SolidWorks, CATIA, Revit</li>
              <li>IT Training: Python, Java, Web Development, Data Science</li>
              <li>Civil Engineering: Structural Design, Quantity Surveying</li>
              <li>Certification Programs</li>
              <li>Professional Development Courses</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-4">
            <h5 className="text-uppercase">Get In Touch</h5>
            <hr className="border-light mb-2" />
            <p>📍 2nd floor, xyz Plaza, Near Pune Highway, Wagholi 412207</p>
            <p>📧 StackLoom@gmail.com</p>
            <p>📞 8888888888 | <FaWhatsapp /> 8888888888</p>
            <p>🌐 www.Stackloom.com</p>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
            <h5 className="text-uppercase">Follow Us On</h5>
            <hr className="border-light mb-2" />
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><FaFacebookF size={20} /></a>
              <a href="#" className="text-light"><FaInstagram size={20} /></a>
              <a href="#" className="text-light"><FaYoutube size={20} /></a>
              <a href="#" className="text-light"><FaLinkedin size={20} /></a>
            </div>
            <p className="mt-3">&copy; 2025 Stack Loom. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
