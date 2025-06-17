import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./courses.css";
import axios from "axios";

const CoursesSlider = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.log("Error fetching courses:", err));
  }, []);

  return (
    <section className="courses-slider">
      <h2 className="section-title">Our Courses</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="course-card">
              <img src={course.image} alt={course.title} className="course-img" />
              <div className="course-info">
                <h3>{course.title} <span>({course.duration || "N/A"})</span></h3>
                <p>{course.description}</p>
                <h4 className="course-price">₹{course.price}</h4>
                <button className="add-to-cart">Add to Cart</button>
                <button className="see-more">See More</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CoursesSlider;
