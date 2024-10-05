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

const CounterSection = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  // State to hold the number of departments
  const [departmentCount, setDepartmentCount] = useState(0);

  // Fetch the number of departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get<{ data: Department[] }>("http://127.0.0.1:8000/api/services-names", {
          headers: {
            "Accept-Language": language,
            "Accept": "application/json",
          },
        });

        // Assuming the API returns an array of departments
        const departments = response.data.data;
        console.log('hii',departments)
        setDepartmentCount(departments.length); // Set the count of departments
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartments();
  }, [language]); // Re-fetch if the language changes

  return (
    <div className="Counter_section_home">
      <SectionHeader title={translations.CounterTitle} />
      <div className="Counter_cards_container">
        <div className="Counter_card">
          <h2 className="Counter_Number">4</h2>
          <p className="Counter_Card_text">{translations.Specialists}</p>
        </div>
        <div className="Counter_card">
          <h2 className="Counter_Number">{departmentCount}</h2> {/* Dynamically set department count */}
          <p className="Counter_Card_text">{translations.Departments}</p>
        </div>
        <div className="Counter_card">
          <h2 className="Counter_Number">
            10 <span>+</span>
          </h2>
          <p className="Counter_Card_text">{translations.Yearsofexperience}</p>
        </div>
        <div className="Counter_card">
          <h2 className="Counter_Number">
            50 <span>+</span>
          </h2>
          <p className="Counter_Card_text">{translations.Patientseveryday}</p>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
