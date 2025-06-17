import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero.css";
import Img2 from '../assests/img2.jpg';
import Img3 from '../assests/img3.jpg';

const HeroSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="hero-container">
      <Slider {...settings} className="hero-slider">
       
        <div className="slide">
          <img src={Img2} alt="Slide 2" />
        </div>
        <div className="slide">
          <img src={Img3} alt="Slide 3" />
        </div>
        
      </Slider>
      <div className="hero-overlay">
  <div className="hero-content">
    <h1 className="hero-title">Transform Your Future with Expert Training</h1>
    <p className="hero-subtitle">
      Elevate your skills, boost your career, and unlock endless opportunities with our top-tier training programs.
    </p>
    <p className="highlighted-text">
      Learn from industry leaders and gain hands-on experience to stand out in the competitive world.
    </p>
    
    <div className="hero-buttons">
      <button className="btn btn-explore"><a href="/courses" className="no-underline">Explore Courses</a></button>
      <button className="btn btn-contact">Get in Touch</button>
    </div>
  </div>
</div>

    </div>
  );
};

export default HeroSection;
