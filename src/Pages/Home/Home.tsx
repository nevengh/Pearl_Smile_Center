import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "../../LanguageContext";
import en from "../../locales/en";
import ar from "../../locales/ar";
import Hero from "../../Components/Hero/Hero";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import OffersCard from "../../Components/OffersCard/OffersCard";
import PageLinkBtn from "../../Components/PageLinkBtn/PageLinkBtn";
import CounterSection from "../../Components/CounterSection/CounterSection";
import OurDoctorSection from "../../Components/OurDoctorSection/OurDoctorSection";
import OurServiceSection from "../../Components/OurServiceSection/OurServiceSection";
import FormContact from "../../Components/FormContact/FormContact";
import Gallery from "../../Components/Gallery/Gallery";
import SeoComponnent from "../../Components/SeoComponnent/SeoComponnent";


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


  const [aboutText, setAboutText] = useState("");


  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [offersPerSlide, setOffersPerSlide] = useState(3);


  const updateOffersPerSlide = () => {
    if (window.innerWidth < 768) {
      setOffersPerSlide(1);
    } else if (window.innerWidth < 992) {
      setOffersPerSlide(2);
    } else {
      setOffersPerSlide(3);
    }
  };

  useEffect(() => {
    updateOffersPerSlide();
    window.addEventListener("resize", updateOffersPerSlide);
    return () => window.removeEventListener("resize", updateOffersPerSlide);
  }, []);

  const slides = [];
  for (let i = 0; i < offers.length; i += offersPerSlide) {
    slides.push(offers.slice(i, i + offersPerSlide));
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Fetch about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get<{ data: AboutData }>(
          // "http://127.0.0.1:8000/api/about-us",
          "https://pearlsmilemedical.ae/dashboard/api/about-us",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );

        const description = response.data.data.description;
        setAboutText(description);
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
          "https://pearlsmilemedical.ae/dashboard/api/offers",
          // "http://127.0.0.1:8000/api/offers",
          {
            headers: {
              "Accept-Language": language,
              Accept: "application/json",
            },
          }
        );

        setOffers(response.data.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, [language]);

  return (
    <div className="home">
      <SeoComponnent
        title={`${translations.PearlSmileSeo} | ${translations.home}`}
        keyword={translations.HomeKeys}
        description={translations.HomeDesc}
        type="website"
      />
      <div className="ne_hero">
        <Hero />
      </div>
      {/* About Us */}
      <div className="About_us_home">
        <SectionHeader title={translations.AboutSectionHeader} />
        <p className="About_us_home_text">{aboutText}</p>
      </div>
      {/* Our Offers */}
      <div className="Our_Offers_Home">
      <SectionHeader title={translations.OurOffers} />
      {slides.length > 0 ? (
        <div className="slider">
          <button onClick={prevSlide} className="slider-button left">
            {"<"}
          </button>
          <div className="slide-container">
            {slides[currentSlide]?.map((offer) => (
              <OffersCard
                key={offer.id}
                defaultImage={offer.main_image.path}
                hoverImage={offer.sub_image.path}
              />
            ))}
            
          </div>
          <button onClick={nextSlide} className="slider-button right">
            {">"}
          </button>
        </div>
      ) : (
        <p>No offers available</p>
      )}
       <PageLinkBtn
          Page_Url="/all-offers"
          Link_Name={translations.SeeOurOffersLink}
        />
    </div>
      {/* Our Services */}
      <div className="Our_Services_home">
        <SectionHeader title={translations.OurServices} />
        <OurServiceSection />
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
          Page_Url="/our-team"
          Link_Name={translations.SeeOurDoctors}
        />
      </div>
      {/* Gallery Section */}
      <div className="gallery_home">
        
        <div className="gallery_images_container">
          <Gallery/>
          <PageLinkBtn Page_Url="/gallery" Link_Name={translations.mediaGallery} />
        </div>
      </div>
      {/* Form Section */}
      <div className="Form_Home">
        <FormContact serviceId="" />
      </div>
      
    </div>
  );
};

export default Home;
