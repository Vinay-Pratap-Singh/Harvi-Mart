import React from 'react'

const ProductCard = (props) => {
  return (
      <div className='flex flex-col items-center justify-center w-[80%] sm:w-1/4 gap-4 border-2 border-gray-300 px-6 pt-10 rounded-xl relative -z-50'>
          {/* for adding to wishlist */}
          <i className="fa-solid fa-heart text-3xl text-gray-300 absolute right-4 top-4 cursor-pointer"></i>

          {/* for addding details of product */}
          <img className='h-48' src={props.imageURL} alt="image" />
          <title>{props.title}</title>

          {/* for displaying the price and brand name */}
          <div className='flex items-center justify-around w-full'>
              <span>{props.price}</span>
              <span>{ props.brand}</span>
          </div>
          <p className='text-sm'>{props.description}</p>

          {/* adding product to cart */}
          <button>Add to Cart</button>
    </div>
  )
}

export default ProductCard