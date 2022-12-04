import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

const Home = () => {
  // accessing the category data
  const [category, setCategory] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/categories");
          const data = res.data.categories;
          setCategory(data);
        } 
      getData()
    },[])
  return (
    <div className='flex flex-col gap-20 py-10'>
      {/* Shop by categories section */}
      <section className='flex flex-col items-center gap-10'>
        <h1 className='font-bold text-2xl'>Shop by Categories</h1>
        {/* div for all the categories card */}
        <div className='flex flex-col sm:flex-row items-center sm:justify-around gap-10 sm:gap-0'>
          {
            category.map((element) => {
              return <CategoryCard imageURL={element.imageURL} categoryName={element.categoryName} description={element.description } key={element._id} />
            })
          }
        </div>
      </section>
    </div>
  )
}

export default Home