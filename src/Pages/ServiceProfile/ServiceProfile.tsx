import { useParams } from "react-router-dom";
import "./ServiceProfile.css";
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import service from "../../assets/images/service_hero.png";
import PagesHero from "../../Components/PagesHero/PagesHero";
import { useEffect, useState } from "react";
import axios from "axios";
import ServiceSectionCard from "../../Components/ServiceSectionCard/ServiceSectionCard";

// Define the structure of the service, sections, and other related data
interface Section {
  id: number;
  section_name: string;
  description: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface Offer {
  id: number;
  title: string;
  description: string;
}

interface MedicalTeam {
  id: number;
  name: string;
  specializations: string;
  image: {
    id: number;
    path: string;
    alt: string;
  } | null;
}

interface Service {
  id: number;
  title: string;
  description: string;
  sections: Section[];
  faqs: FAQ[];
  offers: Offer[];
  medical_teams: MedicalTeam[];
  image: {
    id: number;
    path: string;
    alt: string;
  } | null;
}

const ServiceProfile = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  // Extract the service id from the URL
  const { id } = useParams<{ id: string }>();

  // State to hold service data
  const [serviceData, setServiceData] = useState<Service | null>(null);

  // Fetch service data by ID
  useEffect(() => {
    const fetchServiceById = async () => {
      try {
        const response = await axios.get<{ data: Service }>(
          `http://127.0.0.1:8000/api/service-info/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": language, // Pass the current language to the request header
            },
          }
        );
        setServiceData(response.data.data); // Set service data in state
        console.log("Service Data:", response.data.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceById();
  }, [id, language]); // Refetch when id or language changes

  // Display loading state until the service data is available
  if (!serviceData) {
    return <p>{translations.loading}</p>;
  }

  return (
    <div className="ServiceProfile">
      <PagesHero Hero_name={translations.services} hero_img={service} />

      <div className="service_Profile">
      <div className="service_content_container">
        {/* Safely check if doctor.image exists */}
        <div className="img_doctor">
          {serviceData.image ? (
            <img
              src={serviceData.image.path}
              alt={serviceData.image.alt || "Doctor image"}
            />
          ) : (
            <p>No image available</p> // Fallback if no image is available
          )}
        </div>
        <div className="doctor_info_sec">
          <h1 className="doctor_name">
            {serviceData.title || "No name available"}
          </h1>
          <p className="service_resume">
            {serviceData.description || "No resume available"}
          </p>
        </div>
      </div>
      <div className="service_sections_container">
        <div className="service_sections_container">
          {serviceData.sections.length > 0 ? (
            serviceData.sections.map((section) => {
              console.log("Rendering section:", section); // Add a log to verify section rendering
              return (
                <ServiceSectionCard
                  key={section.id}
                  title={section.section_name}  // Corrected: Use section_name
          description={section.description}  // Use description as it is
                />
              );
            })
          ) : (
            <p>{translations.loading}</p>
          )}
        </div>
      </div>
      <div className="service_FAQ">
        
      </div>
      </div>
    </div>
  );
};

export default ServiceProfile;
