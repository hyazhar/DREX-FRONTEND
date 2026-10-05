import React from 'react'
import Hero from './components/Landing Page/Hero'
import Ribbon from './components/Landing Page/Ribbon'
import ShopByCategory from './components/Landing Page/ShopByCategory'
import ShopByProduct from './components/Landing Page/ShopByProduct'
import Testimonials from './components/Landing Page/Testimonials'
function Home() {
  return (
    <>
      <Hero/>
      <Ribbon/>
      <ShopByCategory/>
      <ShopByProduct/>
      <Testimonials/>
    </>
  )
}

export default Home