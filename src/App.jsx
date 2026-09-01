import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Product from './components/Product'
import Contact from './components/Contact'
import About from './components/About'
import Notfound from './components/Notfound'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
function App() {

      const [product,setproduct]=useState([]);

      useEffect(()=>{

        async function getdata(){
          const data=await fetch("http://localhost:3000/api/products");
          const responsedata= await data.json();
          setproduct(responsedata.products);
          console.log(product);
        }
        getdata()

      },[])


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='*' element={<Notfound/>}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App