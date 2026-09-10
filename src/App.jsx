import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Product from './pages/Product'
import Contact from './pages/Contact'
import About from './pages/About'
import Notfound from './pages/Notfound'
import Footer from './pages/Footer'
import TrackOrder from './pages/TrackOrder'
import ReturnsRefunds from './pages/ReturnsRefunds'
import ShippingPolicy from './pages/ShippingPolicy'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import SiteMap from './pages/SiteMap'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Product/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/trackOrder' element={<TrackOrder/>}></Route>
        <Route path='/returnRefunds' element={<ReturnsRefunds/>}></Route>
        <Route path='/shippingPolicy' element={<ShippingPolicy/>}></Route>
        <Route path='/FAQ' element={<FAQ/>}></Route>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
        <Route path='/terms-conditions' element={<TermsConditions/>}></Route>
        <Route path='/site-map' element={<SiteMap/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App