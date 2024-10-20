import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Close the menu when navigating to another page
  const handleLinkClick = () => {
    setIsMenuOpen(false);  // Close the menu after clicking a link
    setIsServicesOpen(false);  // Close the services dropdown as well
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<{ data: Service[] }>('https://ahmedballeh.com/dashboard/api/services-names', {
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

  const handleServiceClick = (serviceId: number) => {
    handleLinkClick(); // Close the dropdown
    navigate(`/service/${serviceId}`); // Navigate to the service page
  };

  return (
    <div className="ne_Header">
  <div className="logo">
    <img src={logo} alt="logo" />
  </div>
  <div className={`ne_nav_menu ${isMenuOpen ? 'active' : ''}`}>
    <div className="ne_nav_links">
      <Link to="/" onClick={handleLinkClick}>{translations.home}</Link>
    </div>
    <div className="ne_nav_links">
      <Link to="/about-us" onClick={handleLinkClick}>{translations.about}</Link>
    </div>
    <div className="ne_nav_links">
      <Link to="/our-team" onClick={handleLinkClick}>{translations.doctors}</Link>
    </div>
    <div className="ne_nav_links">
      <div className="services_link" onClick={toggleServices}>
        <a>{translations.services}</a>
        <div className={`services_dropdown ${isServicesOpen ? 'show' : ''}`}>
          {services.length > 0 ? (
            services.map((service) => (
              <a key={service.id} onClick={() => handleServiceClick(service.id)}>
                {service.title}
              </a>
            ))
          ) : (
            <p>{translations.loading}</p>
          )}
        </div>
      </div>
    </div>
    <div className="ne_nav_links">
      <Link to="/blogs" onClick={handleLinkClick}>{translations.blogs}</Link>
    </div>
    <div className="ne_nav_links">
      <Link to="/ContactUs" onClick={handleLinkClick}>{translations.contact}</Link>
    </div>
    {/* Move the language select dropdown inside the nav menu */}
    <div className="ne_nav_links">
      <div className="language_btn_in_menu">
        <select onChange={handleLanguageChange} value={language}>
          <option value="en">{translations.English}</option>
          <option value="ar">{translations.Arabic}</option>
        </select>
      </div>
    </div>
  </div>
  <div className="header_buttons">
    <div className="book_now_header">
      <button>{translations.bookNow}</button>
    </div>
  </div>
  <div className="burger_menu" onClick={toggleMenu}>
    {isMenuOpen ? <span className="close_icon">&times;</span> : <span className="burger_icon">&#9776;</span>}
  </div>
</div>

  );
};

export default Header;
