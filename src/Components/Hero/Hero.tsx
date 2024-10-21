import  { useState, useEffect } from 'react';
import "./Hero.css";
import slide1 from "../../assets/images/1.png";
import slide2 from "../../assets/images/2.png";
import slide3 from "../../assets/images/3.png";
import slide4 from '../../assets/images/4.jpg';
import mobileSlide1 from '../../assets/images/1-1.jpg';
import mobileSlide2 from '../../assets/images/2-1.jpg';
import mobileSlide3 from '../../assets/images/3-1.jpg';
import mobileSlide4 from '../../assets/images/4-1.jpg';
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from '../../LanguageContext';
import en from '../../locales/en';
import ar from '../../locales/ar';
import { Link } from "react-router-dom";

const Hero = () => {
  const { language } = useLanguage();
  const translations = language === 'ar' ? ar : en;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 540);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 540);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slides = [
    {
      id: 1,
      image: isMobile ? mobileSlide1 : slide1,
      title: translations.slideTitle,
      text: translations.slideText,
    },
    {
      id: 2,
      image: isMobile ? mobileSlide2 : slide2,
      title: translations.slideTitle,
      text: translations.slideText,
    },
    {
      id: 3,
      image: isMobile ? mobileSlide3 : slide3,
      title: translations.slideTitle,
      text: translations.slideText,
    },
    {
      id: 4,
      image: isMobile ? mobileSlide4 : slide4,
      title: translations.slideTitle,
      text: translations.slideText,
    },
  ];

  return (
    <div className="hero">
      <Carousel>
        {slides.map(slide => (
          <Carousel.Item key={slide.id}>
            <div className="carousel-image-overlay">
              <img className="d-block w-100" src={slide.image} alt={`Slide ${slide.id}`} />
              <div className="overlay"></div>
            </div>
            <Carousel.Caption>
              <div className="carousel_content">
                <h1 className="carousel_title">{slide.title}</h1>
                <p className="carousel_text">{slide.text}</p>
                <div className="carousel-buttons">
                  <div className="book_now_header">
                    <Link to="/ContactUs"><button>{translations.contact}</button></Link>
                  </div>
                  <div className="book_now_header">
                    <Link to='/about-us'>{translations.about}</Link> 
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
