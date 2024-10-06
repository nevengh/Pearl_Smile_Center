import PagesHero from '../../Components/PagesHero/PagesHero'
import './ServicesPage.css'
import service from '../../assets/images/2.png'
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import { useEffect, useState } from 'react';
import ServicesCard from '../../Components/ServicesCard/ServicesCard';
import axios from 'axios';

interface Service {
    id: number;
    title: string;
    image: {
      id: number;
      path: string;
      alt: string;
    } | null; // Allow image to be null
  }
const ServicesPage = () => {
    // State to hold services data
  const [services, setServices] = useState<Service[]>([]);
    const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

     // Fetch services data
     useEffect(() => {
        const fetchServices = async () => {
          try {
            const response = await axios.get<{ data: Service[] }>(
              "http://127.0.0.1:8000/api/servicses-slider",
              {
                headers: {
                  "Accept-Language": language,
                  Accept: "application/json",
                },
              }
            );
            setServices(response.data.data); // Set the services in state
          } catch (error) {
            console.error("Error fetching services:", error);
          }
        };
    
        fetchServices();
      }, [language]);
  return (
    <div className='ServicesPage'>
        <PagesHero Hero_name={translations.services} hero_img={service} />
        <h1 className='servicePage_title'>{translations.servicePageTitle}</h1>
        <SectionHeader title={translations.services}  />
        <div className="Our_Services_Card_Container">
          {services.length > 0 ? (
            services
              .filter((service) => service.image !== null) // Filter out services with null image
              .map((service) => (
                <ServicesCard
                  key={service.id}
                  id={service.id}
                  img_url={service.image!.path} // Non-null assertion, as we've filtered out null images
                  servie_name_card={service.title} // Pass service title
                  img_alt={service.image!.alt} // Non-null assertion for alt text
                />
              ))
          ) : (
            <p>{translations.loading}</p> // Handle empty state or loading
          )}
        </div>
    </div>
  )
}

export default ServicesPage