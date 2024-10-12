import "./Hero.css";
import slide1 from "../../assets/images/1.png";
import slide2 from "../../assets/images/2.png";
import slide3 from "../../assets/images/3.png";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLanguage } from '../../LanguageContext';
import en from '../../locales/en';
import ar from '../../locales/ar';
import { Link } from "react-router-dom";

const Hero = () => {
  const { language } = useLanguage();
  const translations = language === 'ar' ? ar : en;

  const slides = [
    {
      id: 1,
      image: slide1,
      title: translations.slideTitle, // From translation files
      text: translations.slideText, // Add slide text in the translation files
    },
    {
      id: 2,
      image: slide2,
      title: translations.slideTitle, // Second slide title from translations
      text: translations.slideText, // Add text for the second slide
    },
    {
      id: 3,
      image: slide3,
      title: translations.slideTitle, // Third slide title from translations
      text: translations.slideText, // Add text for the third slide
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
