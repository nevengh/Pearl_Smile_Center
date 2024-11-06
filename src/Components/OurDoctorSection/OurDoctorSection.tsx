import { useEffect, useState } from 'react';
import './OurDoctorSection.css'
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import DoctorCard from '../DoctorCard/DoctorCard';
import axios from 'axios';

interface Doctor {
    specializations: string;
    id: number;
    name: string;
    image: {
      id: number;
      path: string;
      alt: string;
    };
    specialization: string;
  }
const OurDoctorSection = () => {
    const { language } = useLanguage();
    const translations = language === "ar" ? ar : en;
  // State to hold doctors data
  const [doctors, setDoctors] = useState<Doctor[]>([]);


    // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<{ data: Doctor[] }>(
          "https://pearlsmilemedical.ae/dashboard/api/specialties-slider",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );
        setDoctors(response.data.data); // Set the doctors in state
        console.log("Doctors", response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [language]); // Re-fetch doctors if the language changes
  return (
    <div className="Our_Doctor_Card_Container">
          {doctors.length > 0 ? (
            doctors.slice(0, 3).map((doctor) => (
              <DoctorCard
                key={doctor.id}
                id={doctor.id} // Pass doctor ID to DoctorCard
                img_url={doctor.image.path} // Use path for doctor image
                Doctor_Name={doctor.name} // Use doctor name
                img_alt={doctor.image.alt} // Use alt text
                Doctor_sevice={doctor.specializations} // Use doctor specialization
              />
            ))
          ) : (
            <p>{translations.loading}</p> // Handle empty state or loading
          )}
        </div>
  )
}

export default OurDoctorSection