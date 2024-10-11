import PagesHero from "../../Components/PagesHero/PagesHero";
import "./ServicesPage.css";
import service from "../../assets/images/2.png";
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { useEffect, useState } from "react";
import ServicesCard from "../../Components/ServicesCard/ServicesCard";
import axios from "axios";
import SeoComponnent from "../../Components/SeoComponnent/SeoComponnent";

interface Service {
  id: number;
  title: string;
  image: {
    id: number;
    path: string;
    alt: string;
  } | null; 
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
        setServices(response.data.data); 
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [language]);
  return (
    <div className="ServicesPage">
      <SeoComponnent
        title={`${translations.PearlSmileSeo} | ${translations.services}`}
        keyword={translations.blogKeySeo}
        description={translations.blogDesSeo}
        type="website"
      />
      <PagesHero Hero_name={translations.services} hero_img={service} />
      <h1 className="servicePage_title">{translations.servicePageTitle}</h1>
      <SectionHeader title={translations.services} />
      <div className="Our_Services_Card_Container">
        {services.length > 0 ? (
          services
            .filter((service) => service.image !== null) 
            .map((service) => (
              <ServicesCard
                key={service.id}
                id={service.id}
                img_url={service.image!.path} 
                servie_name_card={service.title} 
                img_alt={service.image!.alt} 
              />
            ))
        ) : (
          <p>{translations.loading}</p> 
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
