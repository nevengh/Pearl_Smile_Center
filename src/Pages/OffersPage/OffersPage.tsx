import PagesHero from '../../Components/PagesHero/PagesHero'
import './OffersPage.css'
import offer from '../../assets/images/3.png'
import { useLanguage } from '../../LanguageContext';
import en from '../../locales/en';
import ar from '../../locales/ar';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OffersCard from '../../Components/OffersCard/OffersCard';
import SeoComponnent from '../../Components/SeoComponnent/SeoComponnent';

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
  
const OffersPage = () => {
    const { language } = useLanguage();
    const translations = language === 'ar' ? ar : en;

 const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get<{ data: Offer[] }>(
          "https://pearlsmilemedical.ae/dashboard/api/offers",
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
    <div className='OffersPage'>
      <SeoComponnent
        title={`${translations.PearlSmileSeo} | ${translations.OurOffers}`}
        keyword={translations.offerKeys}
        description={translations.offerDes}
        type="website"
      />
        <PagesHero Hero_name={translations.OurOffers} hero_img={offer} />
        <p className="About_us_home_text">{translations.OfferPageText}</p>
        <div className="Offer_page_sec">
        <SectionHeader title={translations.OurOffers} />
        <div className="Our_Offers_Cards_container">
          {offers.length > 0 ? (
            offers.map(
              (
                offer 
              ) => (
                <OffersCard
                  key={offer.id}
                  defaultImage={offer.main_image.path} 
                  hoverImage={offer.sub_image.path}
                />
              )
            )
          ) : (
            <p>{translations.loadingOffers}</p>
          )}
        </div>
        </div>
    </div>
  )
}

export default OffersPage