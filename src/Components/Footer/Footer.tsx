import "./Footer.css";
import logo from "../../assets/images/Logo.svg";
import instagram from "../../assets/images/icons/instagram.svg";
import Facebook from "../../assets/images/icons/facebook.svg";
import Whatsapp from "../../assets/images/icons/whatsapp.svg";
import phone from "../../assets/images/icons/phoneicon.svg";
import mail from "../../assets/images/icons/mailicon.svg";
import Address from "../../assets/images/icons/LocationIcon.svg";
import Ground_Phone from "../../assets/images/icons/groundTelephone.svg";
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import { useEffect, useState } from "react";
import axios from "axios";
import SubscriberSection from "../subscriber_section/subscriberSection";
import Tiktok from '../../assets/images/icons/tiktok.svg'
// Define the structure of the fetched data
interface ContactInfo {
  id: number;
  email: string;
  facebook_link: string;
  instegram_link: string;
  tiktok_link: string;
  phone_number: string;
  mobile_numbers: string;
  whatsapp: string;
  address_en: string;
  address_ar: string;
}
const Footer = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;
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
              "Accept-Language": language,
            },
          }
        );
        setContactInfo(response.data.data);
        console.log("contact-info", response.data.data);
        console.log("mobile_numbers:", response.data.data.mobile_numbers);
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };

    fetchContactInfo();
  }, [language]);

  return (
    <div className="Footer">
      <img src={logo} alt="Pearl Smile Logo" />
      <p className="footer_text">{translations.FooterTitle}</p>
      <div className="subscripe_con">
        <div className="social_footer">
          <h1>{translations.StayUptodate}</h1>
          <div className="social_icons">
            <a target="_blank" href={contactInfo?.instegram_link}>
              <img src={instagram} alt="Instagram Icons" />
            </a>
            <a target="_blank" href={contactInfo?.facebook_link}>
              <img src={Facebook} alt="Facebook Icons" />
            </a>
            <a target="_blank" href={contactInfo?.whatsapp}>
              <img src={Whatsapp} alt="Whatsapp Icons" />
            </a>
            <a target="_blank" href={contactInfo?.tiktok_link}>
              <img src={Tiktok} alt="Tiktok Icons" />
            </a>
          </div>
        </div>

        <SubscriberSection />
      </div>
      <div className="contact_info">
        <div className="contact_info_con">
          <img src={phone} alt="Phone Icon" />
          <div className="phone_info">
            <p className="Tel">{translations.Tel}</p>

            {contactInfo?.mobile_numbers ? (
              contactInfo.mobile_numbers.split(",").map((number, index) => (
                <a key={index} href={`tel:${number.trim()}`}>
                  <p className="mobilee_numberss">{number.trim()}</p>
                </a>
              ))
            ) : (
              <p style={{ color: "rgba(230, 203, 126, 1)" }}>
                No phone numbers available
              </p>
            )}
          </div>
        </div>
        <div className="contact_info_con">
          <img src={mail} alt="Phone Icon" />
          <div className="phone_info">
            <p className="Tel">{translations.FormEmail}</p>
            <p className="phone_number">{contactInfo?.email}</p>
          </div>
        </div>
        <div className="contact_info_con">
          <img src={Address} alt="Phone Icon" />
          <div className="phone_info">
            <p className="Tel">{translations.Address}</p>
            <a href="https://maps.app.goo.gl/NotgTvWUJE2Lvo919"
             target="_blank"
            >
            <p className="phone_number">
              {language === "ar"
                ? contactInfo?.address_ar
                : contactInfo?.address_en}
            </p>
            </a>
            
          </div>
        </div>
        <div className="contact_info_con">
          <img src={Ground_Phone} alt="Phone Icon" />
          <div className="phone_info">
            <p className="Tel">{translations.groundPhone}</p>
            <a href="tel:+97165350887"><p className="phone_number">{contactInfo?.phone_number}</p></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
