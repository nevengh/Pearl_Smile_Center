import { useEffect, useState } from 'react';
import './OurServiceSection.css'
import ServicesCard from "../../Components/ServicesCard/ServicesCard";
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
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
  
const OurServiceSection = () => {
    const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;
    
  // State to hold services data
  const [services, setServices] = useState<Service[]>([]);
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
  )
}

export default OurServiceSection