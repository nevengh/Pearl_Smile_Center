import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import { LanguageProvider } from './LanguageContext';
import Home from './Pages/Home/Home';
import DoctocProfile from './Pages/DoctocProfile/DoctocProfile';
import ScrollToTop from './Components/ScrollToTops/ScrollToTop';
import ServiceProfile from './Pages/ServiceProfile/ServiceProfile';
import AboutUS from './Pages/AboutUS/AboutUS';
import Footer from './Components/Footer/Footer';
import ServicesPage from './Pages/ServicesPage/ServicesPage';
import OffersPage from './Pages/OffersPage/OffersPage';
import DoctorsPage from './Pages/DoctorsPage/DoctorsPage';
import ContactUs from './Pages/ContactUs/ContactUs';
import Blogs from './Pages/Blogs/Blogs';
import BlogsProfile from './Pages/BlogsProfile/BlogsProfile';
import { HelmetProvider } from 'react-helmet-async';
import AllGallery from './Pages/AllGallery/AllGallery';
import TagManager from 'react-gtm-module';

const App = () => {
  const tagManagerArgs = {
    gtmId: 'GTM-W25JNHXP'
  };
  
  TagManager.initialize(tagManagerArgs);
  return (
    <div className='app'>
      <LanguageProvider>
      <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about-us' element={<AboutUS/>} />
          <Route path='/all-services' element={<ServicesPage/>} />
          <Route path='/all-offers' element={<OffersPage/>} />
          <Route path='/our-team' element={<DoctorsPage/>} />
          <Route path='/ContactUs' element={<ContactUs/>} />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/doctor/:id' element={<DoctocProfile/>}/>
          <Route  path='/service/:id' element={<ServiceProfile/>}  />
          <Route  path='/blogs/:id' element={<BlogsProfile/>}  />
          <Route path='/gallery' element={<AllGallery/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </HelmetProvider>
      </LanguageProvider>
    </div>
  )
}

export default App