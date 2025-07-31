import React from 'react'

const Header = () => {
  return (
    <>
      <div class='text-center flex flex-row justify-between bg-black p-10'>
        <div class='flex justify-start text-white'>
            hello
        </div>
        <div class='flex-1 text-center text-white'>
          <input type="text" class='border-solid border-white text-black rounded bg-white' placeholder='Search'>
          </input>
        </div>
        <div class='flex text-center text-white shrink'>
          uh
        </div>
      </div>
    </>  
    )
}

export default Header