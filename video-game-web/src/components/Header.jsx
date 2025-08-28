import React from 'react'
import {useState} from 'react'
import { GoSearch } from "react-icons/go";

const Header = ({query, setQuery, games}) => {



  const gameInput = (vg)=>{
    setQuery(vg.target.value);
  }


  return (
    <>
    <div className="fixed z-100 w-full">
      <div className='text-center flex flex-row justify-between bg-gray-800 p-10'>
        <div className='flex justify-start text-white'>
        Video Game Library
        </div>
      <div className='flex flex-1 justify-center text-white'>
        <form action="" className='w-full max-w-md'>
          <div className='relative'>
            <GoSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none'/>
            <input 
              type="text" 
              className='w-full pl-10 pr-3 py-2 border-solid border-white text-black rounded-2xl bg-white font-semibold placeholder-gray-500 ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2' 
              placeholder='Search game(s)...' 
              value={query} 
              onChange={gameInput} 
              autoComplete="off"
            />
            {/* check if the query w/o spaces is empty. If not, show autocomplete, if it is, show 'no games found' */}
            {query.trim() !== '' && (
              games.length > 0 ? (
                <ul className='border overflow-auto h-60'>
                  {games.map((g) => (
                    <li key = {g.name} className='px-3 py-4 focus:outline-none hover:bg-yellow-50 hover:text-black cursor-pointer'
                    >
                      {g.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='border flex justify-center items-center h-60'>
                  No Games Found
                </div>
              )
            )}
          </div>
        </form>
      </div>
        <div className='flex text-center text-white shrink'>
        Filter
        </div>
      </div>
      </div>
    </>  
    )
}

export default Header