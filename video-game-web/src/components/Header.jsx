import React from 'react'

const Header = () => {
  return (
    <>
      <div className='text-center flex flex-row justify-between bg-black p-10'>
        <div className='flex justify-start text-white'>
            hello
        </div>
        <div className='flex-1 text-center text-white'>
          <input type="text" className='border-solid border-white text-black rounded bg-white' placeholder='Search'>
          </input>
        </div>
        <div className='flex text-center text-white shrink'>
          uh
        </div>
      </div>
    </>  
    )
}

export default Header