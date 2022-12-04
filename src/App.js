import React, { useEffect } from 'react'
import axios from "axios"

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/products")
      const data = res.data.products;
      data.forEach(element => {
        console.log(element);
      });
    }
    getData();
  }, [])
  
  return (
    <div>App</div>
  )
}

export default App