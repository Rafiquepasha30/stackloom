import React from "react";
import "./about.css"; // Import the CSS file

const AboutSection = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        <h2 className="about-title">
          <span className="title-bar">|</span> Unlock Your Potential With Stack Loom
        </h2>
        <p className="about-text">
          Welcome to Stack Loom, where innovation, knowledge, and expertise 
          come together to shape the future of technology and business. As a premier training 
          provider, we are committed to offering exceptional, industry-leading educational programs 
          that empower individuals and organizations to thrive in today’s dynamic and competitive world.
        </p>

        <h3 className="why-title">Why Choose Stack Loom?</h3>
        <ul className="about-list">
          <li><strong>Expert Trainers:</strong> Industry professionals with practical experience deliver real-world knowledge and best practices.</li>
          <li><strong>Industry-Relevant Curriculum:</strong> Programs are designed to meet evolving workforce demands, focusing on the latest technologies and tools.</li>
          <li><strong>Flexible Learning Options:</strong> Online, in-person, and hybrid formats with adaptable schedules for different lifestyles.</li>
          <li><strong>Comprehensive Career Support:</strong> Assistance with resume building, job search, and personalized interview coaching to ensure career success.</li>
          <li><strong>Personalized Learning Experience:</strong> Small class sizes and one-on-one mentoring for effective understanding and application.</li>
          <li><strong>State-of-the-Art Facilities:</strong> Training environments equipped with advanced tools and technology for immersive learning.</li>
        </ul>

        <button className="btn-read-more">Read More</button>
      </div>
    </section>
  );
};

export default AboutSection;
