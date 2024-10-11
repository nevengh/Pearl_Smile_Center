import './DoctorsPage.css'
import { useLanguage } from '../../LanguageContext'
import en from '../../locales/en'
import ar from '../../locales/ar'
import PagesHero from '../../Components/PagesHero/PagesHero'
import team from '../../assets/images/ourTeam.png'
import OurDoctorSection from '../../Components/OurDoctorSection/OurDoctorSection'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import SeoComponnent from '../../Components/SeoComponnent/SeoComponnent'
const DoctorsPage = () => {
    const { language } = useLanguage();
    const translations = language === 'ar' ? ar : en;
  return (
    <div className='DoctorsPage'>
      <SeoComponnent
        title={`${translations.PearlSmileSeo} | ${translations.doctors}`}
        keyword={translations.blogKeySeo}
        description={translations.blogDesSeo}
        type="website"
      />
        <PagesHero Hero_name={translations.doctors} hero_img={team}  />
        <p className="About_us_home_text">{translations.DoctorPageText}</p>
        <SectionHeader title={translations.MeetOurSpecialists} />
        <OurDoctorSection/>

    </div>
  )
}

export default DoctorsPage