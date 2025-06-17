import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Us</h1>
      </div>

      <div className="breadcrumb">
        <span>Home</span> &gt; <span>About Us</span>
      </div>

      <div className="about-content container">
        <h2>Welcome to Stack Loom</h2>
        <p>
          At Stack Loom, we believe learning should be practical, flexible, and empowering. That’s why we offer hands-on
          training across key fields like FullStack Development, Data Science, Data Analytics, and CAD.
          Our goal is simple: to help learners thrive in a competitive digital world with confidence and clarity.
        </p>

        <h3>Why Choose Stack Loom?</h3>
        <ul>
          <li><strong>Expert Trainers:</strong> Our instructors are real-world professionals bringing industry insights directly to the classroom.</li>
          <li><strong>Career-Focused Curriculum:</strong> Stay up-to-date with programs tailored to current tech trends and business needs.</li>
          <li><strong>Flexible Learning:</strong> Online, offline, or hybrid—choose a schedule that fits your life.</li>
          <li><strong>Career Support:</strong> We assist with resumes, job hunts, and interview prep to help you land that dream job.</li>
          <li><strong>Personalized Guidance:</strong> Indivisual Trainings and mentoring ensure that you’re never lost in the crowd.</li>
          <li><strong>Modern Infrastructure:</strong> Learn in well-equipped spaces that reflect the latest in tech learning environments.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
