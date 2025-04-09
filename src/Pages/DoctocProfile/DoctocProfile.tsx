import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DoctocProfile.css";
import axios from "axios";
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import PagesHero from "../../Components/PagesHero/PagesHero";
import team from "../../assets/images/ourTeam.png";
import ServicesCard from "../../Components/ServicesCard/ServicesCard";
import SeoComponnent from "../../Components/SeoComponnent/SeoComponnent";
// import ReactPlayer from 'react-player';

// Define the structure of the service and doctor's data
interface Service {
  id: number;
  title: string;
  image: {
    id: number;
    path: string;
    alt: string;
  } | null; // Allow image to be null
}

interface Doctor {
  id: number;
  name: string | null; // Allow null for the name
  specializations: string | null; // Allow null for the specializations
  image?: {
    id: number;
    path: string;
    alt: string;
  } | null; // Optional image field to handle missing data
  video?: {
    id: number;
    path: string;
    description: string;
  };
  specialization: string;
  resume: string | null; // Allow null for the resume
  phone_number: string;
  services: Service[]; // Include a list of services
}

const DoctorProfile = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  // Extract the doctor's id from the URL
  const { id } = useParams<{ id: string }>();

  // State to hold the doctor’s data
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  // Fetch doctor data by ID
  useEffect(() => {
    const fetchDoctorById = async () => {
      try {
        const response = await axios.get<{ data: Doctor }>(
          `https://pearlsmilemedical.ae/dashboard/api/specialists/${id}`,
          // `http://127.0.0.1:8000/api/specialists/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": language, 
            },
          }
        );
        setDoctor(response.data.data);
        console.log("Doctor Data:", response.data.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorById();
  }, [id, language]);

  if (!doctor) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div className="DoctorProfile">
      <SeoComponnent
        title={`${translations.PearlSmileSeo} | ${doctor?.name}`}
        keyword={`${doctor?.name}, ${doctor?.specializations}, ${translations.doctors}`}
        description={translations.DoctorProfileDesSeo}
        type="website"
      />
      <PagesHero Hero_name={translations.OurTeam} hero_img={team} />
      <div className="Doctor_Profile_content_container">
 
        <div className="img_doctor">
          {doctor.image ? (
            <img
              src={doctor.image.path}
              alt={doctor.image.alt || "Doctor image"}
            />
          ) : (
            <p>No image available</p> 
          )}
        </div>

        <div className="doctor_info_sec">
          <h1 className="doctor_name">{doctor.name || "No name available"}</h1>
          <h3 className="doctor_spec">
            {doctor.specializations || "No specializations available"}
          </h3>
          <p className="doctor_resume">
            {doctor.resume || "No resume available"}
          </p>
        </div>

        <div className="doctor_video">
          {/* Add any doctor video section here if needed */}
        </div>

        {/* Doctor's Services Section */}
        <div className="doctor_services">
          <h1 className="doctor_services_title">
            {translations.servicesName} {doctor.name} :
          </h1>
          <div className="services_card_container">
            {doctor.services.length > 0 ? (
              doctor.services.map((service) => (
                <ServicesCard
                  key={service.id}
                  id={service.id}
                  img_url={service.image?.path || ""} // Use image path or empty string if null
                  servie_name_card={service.title}
                  img_alt={service.image?.alt || "Service image"} // Use alt text or fallback
                />
              ))
            ) : (
              <p>{translations.noServicesAvailable}</p> // Handle case when no services are available
            )}
          </div>
          <div className="video">
            {doctor.video && (
              <div className="video">
                <iframe
                  src={doctor.video.path}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
