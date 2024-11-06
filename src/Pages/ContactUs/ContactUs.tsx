import PagesHero from '../../Components/PagesHero/PagesHero'
import './ContactUs.css'
import { useLanguage } from '../../LanguageContext';
import en from '../../locales/en';
import ar from '../../locales/ar';
import contact from '../../assets/images/2.png'
import FormContact from '../../Components/FormContact/FormContact';
import Time from "../../assets/images/icons/Time.svg";

import phone from "../../assets/images/icons/phoneicon.svg";
import mail from "../../assets/images/icons/mailicon.svg";
import Address from "../../assets/images/icons/LocationIcon.svg";
import Ground_Phone from "../../assets/images/icons/groundTelephone.svg";
import { useEffect, useState } from 'react';
import axios from 'axios';
import SeoComponnent from '../../Components/SeoComponnent/SeoComponnent';
interface ContactInfo {
    id: number;
    email: string;
    facebook_link: string;
    instegram_link: string;
    tiktok_link: string;
    phone_number: string;
    mobile_numbers: string[]; // Updated to array type
    whatsapp: string;
    address_en: string;
    address_ar: string;
  }
const ContactUs = () => {
    const { language } = useLanguage();
  const translations = language === 'ar' ? ar : en;
   // State to store contact information
   const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

   // Fetch contact information from the API
   useEffect(() => {
     const fetchContactInfo = async () => {
       try {
         const response = await axios.get<{ data: ContactInfo }>(
           "https://pearlsmilemedical.ae/dashboard/api/contacts-info",
           {
             headers: {
               Accept: "application/json",
               "Accept-Language": language, // Pass the current language to the request header
             },
           }
         );
         setContactInfo(response.data.data); // Set the fetched contact information
         console.log("contact-info", response.data.data);
       } catch (error) {
         console.error("Error fetching contact information:", error);
       }
     };
 
     fetchContactInfo();
   }, [language]); // Refetch contact information when language changes
   const map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.4128595675497!2d55.3807487!3d25.323923500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5bd48e07b16f%3A0x9bc425fdc12d5e73!2sPearl%20Smile%20Medical%20Center!5e0!3m2!1sen!2sus!4v1729205944891!5m2!1sen!2sus"
  return (
    <div className='ContactUs'>
      <SeoComponnent
        title={`${translations.ContactTitle} | ${translations.contact}`}
        keyword=''
        description=''
        type="website"
      />
        <PagesHero Hero_name={translations.contact} hero_img={contact}  />
        <div className="Form_Home">
            <FormContact serviceId=''/>
        </div>
        <div className="contactTimesInfo">
        <div className="contactContentleft">
          <div className="ContactTitleInfo">
            <h1>{translations.PearlSmile}</h1>
            <p>{translations.MedicalCenter}</p>

          </div>
          <div className="OpenTime">
            <img src={Time} alt="Time Icon" />
            <div className="openInfo">
              <p className="Tel"> {translations.Open} </p>
              <p className="phone_number ground_number">SAT to THU 9:00am to 9:00pm</p>
            </div>
          </div>
          <div className="contact_info">
            <div className="contact_info_1">
            <div className="contact_info_con">
              <img src={phone} alt="Phone Icon" />
              <div className="phone_info">
                <p className="Tel">{translations.FormPhone}</p>
                <p className="phone_number">
                    {/* Render mobile numbers */}
            {Array.isArray(contactInfo?.mobile_numbers) && contactInfo?.mobile_numbers.length > 0 ? (
              contactInfo.mobile_numbers.map((number, index) => (
                <a key={index} href={`tel:${number}`} className="mobile_number">
                  {number}
                </a> // Render each mobile number as a clickable link
              ))
            ) : (
              <p>No phone numbers available</p>
            )}
                </p>
              </div>
            </div>
            <div className="contact_info_con">
              <img src={mail} alt="Phone Icon" />
              <div className="phone_info">
                <p className="Tel">{translations.FormEmail}</p>
                <p className="phone_number">{contactInfo?.email}</p>
              </div>
            </div>
            </div>
            <div className="contact_info_1">
            <div className="contact_info_con">
              <img src={Address} alt="Phone Icon" />
              <div className="phone_info">
                <p className="Tel">{translations.Address}</p>
                <p className="phone_number">
                {language === "ar" ? contactInfo?.address_ar : contactInfo?.address_en}
                </p>
              </div>
            </div>
            <div className="contact_info_con">
              <img src={Ground_Phone} alt="Phone Icon" />
              <div className="phone_info">
                <p className="Tel">{translations.groundPhone}</p>
                <p className="phone_number">{contactInfo?.phone_number}</p>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className="contactContentRight">
        <div className="contact_us_map">
          <div className="map-container">
            <div
              className="elementor-element elementor-element-9e5d0bf e-con-full e-flex e-con e-child"
              data-id="9e5d0bf"
              data-element_type="container"
            >
              <div
                className="elementor-element elementor-element-3e5ee4b elementor-widget elementor-widget-text-editor"
                data-id="3e5ee4b"
                data-element_type="widget"
                data-widget_type="text-editor.default"
              >
                <div className="elementor-widget-container">
                  <iframe
                    src={map}
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs