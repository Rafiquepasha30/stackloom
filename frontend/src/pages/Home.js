import React from "react";
import './Home.css'
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import EnquireNow from "./EnquireNow";
import Courses from "./courses";

const Home = () => {
  return (
    <>
      <Hero/>
      <AboutSection/>
      <EnquireNow/>
      <Courses/>
      
    </>
  );
};

export default Home;
