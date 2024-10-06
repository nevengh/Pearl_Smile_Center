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


const App = () => {
  return (
    <div className='app'>
      <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about-us' element={<AboutUS/>} />
          <Route path='/all-services' element={<ServicesPage/>} />
          <Route path='/doctor/:id' element={<DoctocProfile/>}/>
          <Route  path='/service/:id' element={<ServiceProfile/>}  />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </LanguageProvider>
    </div>
  )
}

export default App