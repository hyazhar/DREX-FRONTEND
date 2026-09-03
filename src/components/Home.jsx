import React from 'react'
import Hero from './Landing Page/Hero'
import Ribbon from './Landing Page/Ribbon'
import ShopByCategory from './Landing Page/ShopByCategory'
import ShopByProduct from './Landing Page/ShopByProduct'
import Testimonials from './Landing Page/Testimonials'
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