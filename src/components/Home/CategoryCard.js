import React from 'react'

const CategoryCard = (props) => {
  return (
      <div className='flex flex-col items-center justify-center h-96 w-[80%] sm:w-1/4  gap-4 border-2 border-gray-300 px-6 rounded-xl'>
          <img className='h-40' src={props.imageURL} alt="image" />
          <h1 className='font-semibold text-xl capitalize'>{props.categoryName}</h1>
          <p className='text-sm'>{ props.description}</p>
    </div>
  )
}

export default CategoryCard