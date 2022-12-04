import React, { useEffect } from 'react'
import axios from "axios"
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import About from "./components/About"
import Products from "./components/Product/Products"
import Wishlist from "./components/Wishlist"
import Cart from "./components/Cart"
import Registration from "./components/Registration/RegistrationPage"
import Footer from './components/Footer'
import Error from "./components/Error"

const App = () => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get("/api/products")
  //     const data = res.data.products;
  //     data.forEach(element => {
  //       console.log(element);
  //     });
  //   }
  //   getData();
  // }, [])
  
  return (
    <div>
      {/* using the navbar */}
      <Navbar></Navbar>
      {/* importing all the routes */}
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/products' element={ <Products/> } />
        <Route path='/wishlist' element={ <Wishlist/> } />
        <Route path='/cart' element={ <Cart/> } />
        <Route path='/registration' element={<Registration />} />
        <Route path="*" element={<Error/>} />
      </Routes>

      {/* adding the footer */}
      <Footer></Footer>
    </div>
  )
}

export default App