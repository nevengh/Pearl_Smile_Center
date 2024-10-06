import PagesHero from '../../Components/PagesHero/PagesHero'
import './AboutUS.css'
import { useLanguage } from '../../LanguageContext';
import en from '../../locales/en';
import ar from '../../locales/ar';
import about from '../../assets/images/1.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import CounterSection from '../../Components/CounterSection/CounterSection';

interface AboutData {
    id: number;
    description: string;
  }
const AboutUS = () => {
    const { language } = useLanguage();
    const translations = language === 'ar' ? ar : en;
// State to hold the about description
const [aboutText, setAboutText] = useState("");
    // Fetch about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get<{ data: AboutData }>(
          "http://127.0.0.1:8000/api/about-us",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );

        const description = response.data.data.description;
        setAboutText(description); // Set the description based on the selected language
      } catch (error) {
        console.error("Error fetching about us content:", error);
      }
    };

    fetchAbout();
  }, [language]);

  return (
    <div className='AboutUS'>
        <PagesHero Hero_name={translations.about} hero_img={about}  />
        <p className="About_us_home_text">{aboutText}</p>
        <div className="about_page_counter">
            <CounterSection/>
        </div>
    </div>
  )
}

export default AboutUS