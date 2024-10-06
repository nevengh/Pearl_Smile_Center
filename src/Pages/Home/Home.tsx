import Hero from "../../Components/Hero/Hero";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import "./Home.css";
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import { useEffect, useState } from "react";
import axios from "axios";
import OffersCard from "../../Components/OffersCard/OffersCard";
import PageLinkBtn from "../../Components/PageLinkBtn/PageLinkBtn";

import CounterSection from "../../Components/CounterSection/CounterSection";
import OurDoctorSection from "../../Components/OurDoctorSection/OurDoctorSection";
import OurServiceSection from "../../Components/OurServiceSection/OurServiceSection";


// Define the interface for the fetched data
interface AboutData {
  id: number;
  description: string;
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




const Home = () => {
  const { language } = useLanguage();
  const translations = language === "ar" ? ar : en;

  // State to hold the about description
  const [aboutText, setAboutText] = useState("");

  // State to hold offers data
  const [offers, setOffers] = useState<Offer[]>([]);



  // Fetch about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get<{ data: AboutData }>(
          "http://127.0.0.1:8000/api/about-us",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );

        const description = response.data.data.description;
        setAboutText(description); // Set the description based on the selected language
      } catch (error) {
        console.error("Error fetching about us content:", error);
      }
    };

    fetchAbout();
  }, [language]);

  // Fetch offers data
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get<{ data: Offer[] }>(
          "http://127.0.0.1:8000/api/offers",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );

        setOffers(response.data.data); // Set the offers in state
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, [language]); // Re-fetch offers if the language changes

  
  

  return (
    <div className="home">
      <div className="ne_hero">
        <Hero />
      </div>
      {/* About Us */}
      <div className="About_us_home">
        <SectionHeader title={translations.AboutSectionHeader} />
        <p className="About_us_home_text">{aboutText}</p>
        {/* Render fetched text */}
      </div>
      {/* Our Offers */}
      <div className="Our_Offers_Home">
        <SectionHeader title={translations.OurOffers} />
        <div className="Our_Offers_Cards_container">
          {offers.length > 0 ? (
            offers.slice(0, 3).map(
              (
                offer // Limit to 3 offers
              ) => (
                <OffersCard
                  key={offer.id}
                  defaultImage={offer.main_image.path} // Use path for default image
                  hoverImage={offer.sub_image.path} // Use path for hover image
                />
              )
            )
          ) : (
            <p>{translations.loadingOffers}</p> // Handle empty state or loading
          )}
        </div>
        <PageLinkBtn
          Page_Url="/offers"
          Link_Name={translations.SeeOurOffersLink}
        />
      </div>
      {/* Our Services */}
      <div className="Our_Services_home">
        <SectionHeader title={translations.OurServices} />
        <OurServiceSection/>
        <PageLinkBtn
          Page_Url="/all-services"
          Link_Name={translations.SeeOurServices}
        />
      </div>
      {/* Counter Section */}
      <CounterSection />
      {/* Our Doctors */}
      <div className="Our_Doctor_home">
        <SectionHeader title={translations.MeetOurSpecialists} />
        <OurDoctorSection />
        <PageLinkBtn
          Page_Url="/doctor"
          Link_Name={translations.SeeOurDoctors}
        />
      </div>
    </div>
  );
};

export default Home;
