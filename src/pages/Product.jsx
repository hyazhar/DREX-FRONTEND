import React, { useEffect, useState } from 'react'
function Product() {
  let [products,setproduct]=useState({});
  
  async function getdata(){
      let data= await fetch('https://fakestoreapi.com/products');
      let finaldata= await data.json();
      setproduct(finaldata);
      console.log(products);
  }
  useEffect(()=>{
    getdata();
  },[])

  return (
    <>
        <h1>Product</h1>
    </>
  )
}

export default Product;