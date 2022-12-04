import React from 'react'

const Login = () => {
  return (
    <form className='w-96 bg-gray-100 p-4'>
      {/* email */}
      <div className='flex flex-col relative my-4 moveText'>
        <input className=' bg-gray-300 p-2' type="text" />
        <label className='absolute top-2 left-2' htmlFor="">Email</label>
      </div>

      {/* password */}
      <div className='flex flex-col relative my-4 moveText'>
        <input className=' bg-gray-300 p-2' type="text" />
        <label className='absolute top-2 left-2' htmlFor="">Password</label>
      </div>

      <button>Log in</button>
    </form>
  )
}

export default Login