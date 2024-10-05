import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import { LanguageProvider } from './LanguageContext';
import Home from './Pages/Home/Home';
import DoctocProfile from './Pages/DoctocProfile/DoctocProfile';
import ScrollToTop from './Components/ScrollToTops/ScrollToTop';
import ServiceProfile from './Pages/ServiceProfile/ServiceProfile';


const App = () => {
  return (
    <div className='app'>
      <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/doctor/:id' element={<DoctocProfile/>}/>
          <Route  path='/service/:id' element={<ServiceProfile/>}  />
        </Routes>
      </BrowserRouter>
      </LanguageProvider>
    </div>
  )
}

export default App