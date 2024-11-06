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
import FormContact from "../../Components/FormContact/FormContact";
import SeoComponnent from "../../Components/SeoComponnent/SeoComponnent";
import OffersCard from "../../Components/OffersCard/OffersCard";
import DoctorCard from "../../Components/DoctorCard/DoctorCard";

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
  main_image: {
    id: number;
    path: string;
    alt: string;
  };
  sub_image: {
    id: number;
    path: string;
    alt: string;
  };
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

  // State to manage the active FAQ for accordion
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Fetch service data by ID
  useEffect(() => {
    const fetchServiceById = async () => {
      try {
        const response = await axios.get<{ data: Service }>(
          `https://pearlsmilemedical.ae/dashboard/api/service-info/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": language, 
            },
          }
        );
        setServiceData(response.data.data); 
        console.log("Service Data:", response.data.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceById();
  }, [id, language]);

  // Toggle FAQ visibility
  const toggleFaq = (faqId: number) => {
    setActiveFaq((prevFaqId) => (prevFaqId === faqId ? null : faqId));
  };

  if (!serviceData) {
    return <p>{translations.loading}</p>;
  }

  return (
    <div className="ServiceProfile">
      <SeoComponnent
        title={`${translations.PearlSmileSeo} | ${serviceData?.title}`}
        keyword={translations.serviceKeys}
        description={translations.serviceDesc}
        type="website"
      />
      <PagesHero Hero_name={translations.services} hero_img={service} />

      <div className="service_Profile">
        <div className="service_content_container">
          <div className="img_doctor">
            {serviceData.image ? (
              <img
                src={serviceData.image.path}
                alt={serviceData.image.alt || "Doctor image"}
              />
            ) : (
              <p>{translations.Noimageavailable}</p> 
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
              serviceData.sections.map((section) => (
                <ServiceSectionCard
                  key={section.id}
                  title={section.section_name} 
                  description={section.description}
                />
              ))
            ) : (
              <p>{translations.loading}</p>
            )}
          </div>
          
          {/* Accordion for FAQs */}
          <div className="faq_section">
            <h1 className="faq_head">{translations.faq_head}</h1>
            {serviceData.faqs.length > 0 ? (
              serviceData.faqs.map((faq) => (
                <div key={faq.id} className="faq_item">
                  <div
                    className="faq_question"
                    onClick={() => toggleFaq(faq.id)}
                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
                    <div className="circle_icon">
                      {/* Create circle and arrow */}
                      <span style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        border: '2px solid #000', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        {/* Arrow down or up */}
                        {activeFaq === faq.id ? (
                          <span>&#9650;</span> // Arrow up
                        ) : (
                          <span>&#9660;</span> // Arrow down
                        )}
                      </span>
                    </div>
                    <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                      {faq.question}
                    </span>
                  </div>
                  {activeFaq === faq.id && (
                    <div className="faq_answer" style={{ padding: "10px 0" }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>{translations.noFaqAvailable}</p>
            )}
          </div>

          {/* Offers Section */}
          <div className="service_offer">
            <h1 className="service_offer_head">{serviceData.title} {translations.service_offer_head} :</h1>
            <div className="offers_con_service">
            {serviceData.offers.length > 0 ? (
              serviceData.offers.map((offer) => (
                  <OffersCard
                  key={offer.id}
                  defaultImage={offer.main_image.path} // Use actual main image
                  hoverImage={offer.sub_image.path}   // Use actual sub image
                />
              ))
            ) : (
              <p>{translations.loadingOffers}</p>
            )}
            </div>
          </div>
          <div className="service_doctors">
            <h1 className="service_doctors_head">{serviceData.title}   {translations.service_doctor_head}:</h1>
            <div className="offers_con_service">
            {serviceData.medical_teams.length > 0 ? (
              serviceData.medical_teams.map((doctor) => (
                  <DoctorCard
                  Doctor_Name={doctor.name}
                  Doctor_sevice={doctor.specializations}
                  id={doctor.id}
                  img_alt={doctor.image?.alt|| "Doctor Image"}
                  img_url={doctor.image?.path || ""}
                />
              ))
            ) : (
              <p>{translations.Noimageavailable}</p>
            )}
            </div>
          </div>
        </div>

        <div className="service_Booking">
          {/* Pass the service id to FormContact */}
          <FormContact serviceId={id || ""} />
        </div>
      </div>
    </div>
  );
};

export default ServiceProfile;
