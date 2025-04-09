import './DoctorsPage.css'
import { useLanguage } from '../../LanguageContext'
import en from '../../locales/en'
import ar from '../../locales/ar'
import PagesHero from '../../Components/PagesHero/PagesHero'
import team from '../../assets/images/ourTeam.png'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import SeoComponnent from '../../Components/SeoComponnent/SeoComponnent'
import axios from 'axios';
import { useEffect, useState } from 'react'
import DoctorCard from '../../Components/DoctorCard/DoctorCard'

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
const DoctorsPage = () => {
    const { language } = useLanguage();
    const translations = language === 'ar' ? ar : en;
    const [doctors, setDoctors] = useState<Doctor[]>([]);

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
          setDoctors(response.data.data); 
          console.log("Doctors", response.data.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };
  
      fetchDoctors();
    }, [language]);
  return (
    <div className='DoctorsPage'>
      <SeoComponnent
        title={`${translations.PearlSmileSeo} | ${translations.doctors}`}
        keyword={translations.DoctorKeys}
        description={translations.DoctorDesc}
        type="website"
      />
        <PagesHero Hero_name={translations.doctors} hero_img={team}  />
        <p className="About_us_home_text">{translations.DoctorPageText}</p>
        <SectionHeader title={translations.MeetOurSpecialists} />
        <div className="Our_Doctor_Card_Container_pages">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                id={doctor.id} 
                img_url={doctor.image.path}
                Doctor_Name={doctor.name} 
                img_alt={doctor.image.alt} 
                Doctor_sevice={doctor.specializations} 
              />
            ))
          ) : (
            <p>{translations.loadingDoctors}</p> 
          )}
        </div>

    </div>
  )
}

export default DoctorsPage