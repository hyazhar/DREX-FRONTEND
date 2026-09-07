import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Product from './components/Product'
import Contact from './components/Contact'
import About from './components/About'
import Notfound from './components/Notfound'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
import TrackOrder from './components/TrackOrder'
import ReturnsRefunds from './components/ReturnsRefunds'
import ShippingPolicy from './components/ShippingPolicy'
import FAQ from './components/FAQ'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'
import SiteMap from './components/SiteMap'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
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