import React from 'react';
import {NavLink} from 'react-router-dom';

const TitleCard = ({title}) => {
  return (
    <>
    <div className="relative flex flex-row justify-center items-center bg-gradient-to-r from-purple-1000 to-gray-600 shadow-md opacity-90">
      <span className=" text-2xl font-serif font-extrabold flex flex-col text-center">      
          {title}
        </span>
          <button className="absolute right-4 border rounded-2xl px-2 py-0.5 bg-gray-600 border-gray-600 transition-transform hover:scale-110 hover:cursor-pointer ">
          <NavLink to={`/category/${title}`} key={title}>

              View More

              </NavLink>

          </button>
     
      </div>
    </>
  )
}

export default TitleCard