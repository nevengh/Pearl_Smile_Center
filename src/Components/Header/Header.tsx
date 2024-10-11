import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../LanguageContext';
import en from '../../locales/en';
import ar from '../../locales/ar';
import './Header.css';
import logo from '../../assets/images/Logo.svg';

interface Service {
  id: number;
  title: string;
}

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const translations = language === 'ar' ? ar : en;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<{ data: Service[] }>('http://127.0.0.1:8000/api/services-names', {
          headers: {
            'Accept-Language': language,
            'Accept': 'application/json',
          },
        });
        console.log('API response:', response.data); // Log the response to check the data
        setServices(response.data.data); // Set the services in state
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'ar');
  };

  return (
    <div className="ne_Header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className={`ne_nav_menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="ne_nav_links">
          <Link to="/">{translations.home}</Link>
        </div>
        <div className="ne_nav_links">
          <Link to="/about-us">{translations.about}</Link>
        </div>
        <div className="ne_nav_links">
          <Link to="/our-team">{translations.doctors}</Link>
        </div>
        <div className="ne_nav_links">
          <div className="services_link" onClick={toggleServices}>
            <a>{translations.services}</a>
            <div className={`services_dropdown ${isServicesOpen ? 'show' : ''}`}>
              {services.length > 0 ? (
                services.map((service) => (
                  <Link key={service.id} to={`/service/${service.id}`}>
                    {service.title}
                  </Link>
                ))
              ) : (
                <p>{translations.loading}</p>
              )}
            </div>
          </div>
        </div>
        <div className="ne_nav_links">
          <Link to="/blogs">{translations.blogs}</Link>
        </div>
        <div className="ne_nav_links">
          <Link to="/ContactUs">{translations.contact}</Link>
        </div>
      </div>
      <div className="header_buttons">
        <div className="book_now_header">
          <button>{translations.bookNow}</button>
        </div>
        <div className="language_btn">
          <select onChange={handleLanguageChange} value={language}>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      </div>
      <div className="burger_menu" onClick={toggleMenu}>
        {isMenuOpen ? <span className="close_icon">&times;</span> : <span className="burger_icon">&#9776;</span>}
      </div>
    </div>
  );
};

export default Header;
