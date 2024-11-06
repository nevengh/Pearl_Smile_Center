import PagesHero from '../../Components/PagesHero/PagesHero';
import './AboutUS.css';
import { useLanguage } from '../../LanguageContext';
import en from '../../locales/en';
import ar from '../../locales/ar';
import about from '../../assets/images/1.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CounterSection from '../../Components/CounterSection/CounterSection';
import SeoComponnent from '../../Components/SeoComponnent/SeoComponnent';

interface AboutData {
  id: number;
  description: string;
  video: {
    id: number;
    path: string;
    description: string;
  } | null; // Allow video to be null
}

const AboutUS = () => {
  const { language } = useLanguage();
  const translations = language === 'ar' ? ar : en;

  // State to hold the about description and video
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  // Fetch about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get<{ data: AboutData }>(
          // 'http://127.0.0.1:8000/api/about-us',
          "https://pearlsmilemedical.ae/dashboard/api/about-us",
          {
            headers: {
              'Accept-Language': language,
              Accept: 'application/json',
            },
          }
        );

        setAboutData(response.data.data); // Store the entire about data
        console.log('aboutUs', response.data.data);
      } catch (error) {
        console.error('Error fetching about us content:', error);
      }
    };

    fetchAbout();
  }, [language]);

  return (
    <div className="AboutUS">
      <SeoComponnent
        title={translations.aboutTitleSeo}
        keyword={translations.AboutKeys}
        description={translations.AboutDesc}
        type="website"
      />
      <PagesHero Hero_name={translations.about} hero_img={about} />
      <p className="About_us_home_text">{aboutData?.description}</p>
      <div className="about_video">
        {aboutData?.video && aboutData.video.path ? (
          <iframe
            src={aboutData.video.path}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={aboutData.video.description}
            className="gallery-video"
          ></iframe>
        ) : (
          <p>{translations.loadingVideo || 'Video is not available'}</p>
        )}
      </div>
      <div className="about_page_counter">
        <CounterSection />
      </div>
    </div>
  );
};

export default AboutUS;
