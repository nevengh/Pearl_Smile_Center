import { useEffect, useState } from "react";
import SectionHeader from '../SectionHeader/SectionHeader';
import './CounterSection.css';
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import axios from "axios";

// Define the structure of the department data (based on what the API returns)
interface Department {
  id: number;
  name: string;
}
interface Doctor {
  specializations: string;
  id: number;
  name: string;
}

const CounterSection = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  
  const [departmentCount, setDepartmentCount] = useState(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  // Fetch the number of departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get<{ data: Department[] }>("https://pearlsmilemedical.ae/dashboard/api/services-names", {
          headers: {
            "Accept-Language": language,
            "Accept": "application/json",
          },
        });

        const departments = response.data.data;
        console.log('hii',departments)
        setDepartmentCount(departments.length);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<{ data: Doctor[] }>("https://pearlsmilemedical.ae/dashboard/api/specialties-slider", {
          headers: {
            "Accept-Language": language,
            "Accept": "application/json",
          },
        });

        const doctors = response.data.data;
        console.log('hii',doctors)
        setDoctors(doctors);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDoctors();
    fetchDepartments();
  }, [language]); 

  return (
    <div className="Counter_section_home">
      <SectionHeader title={translations.CounterTitle} />
      <div className="Counter_cards_container">
        <div className="Counter_card">
          <h2 className="Counter_Number">{doctors.length}</h2>
          <p className="Counter_Card_text">{translations.Specialists}</p>
        </div>
        <div className="Counter_card">
          <h2 className="Counter_Number">{departmentCount}</h2> 
          <p className="Counter_Card_text">{translations.Departments}</p>
        </div>
        <div className="Counter_card">
          <h2 className="Counter_Number">
            2 <span>+</span>
          </h2>
          <p className="Counter_Card_text">{translations.Yearsofexperience}</p>
        </div>
        <div className="Counter_card">
          <h2 className="Counter_Number">
            20 <span>+</span>
          </h2>
          <p className="Counter_Card_text">{translations.Patientseveryday}</p>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
