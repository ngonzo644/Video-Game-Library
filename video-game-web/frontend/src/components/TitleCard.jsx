import React from 'react';
import {NavLink} from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import {useState} from 'react';

const TitleCard = ({title, setSeeMore, seeMore}) => {
  

  return (
    <>
    <div className=" relative flex flex-row justify-center items-center bg-gradient-to-r from-purple-1000 to-gray-600 shadow-md opacity-90 ">
      <span className=" text-2xl font-serif font-extrabold flex flex-col text-center">      
          {title}
        </span>

        
          <button className="absolute right-4 border rounded-2xl px-2 py-0.5 bg-gray-600 border-gray-600 transition-transform hover:scale-110 hover:cursor-pointer flex items-center animate-pulse [animation-duration:5s]" onClick={()=>setSeeMore((prev)=>prev===title? prev=null: prev=title)} >

              {seeMore===title ? 
              (
              <div className="flex items-center">
                <span>Go Back</span>
                <MdKeyboardDoubleArrowLeft />
              </div>):
              (
              <div className="flex items-center">
                <span>View More</span>
                <MdKeyboardDoubleArrowRight />
              </div>
              
              )}


          </button>

      </div>
    </>
  )
}

export default TitleCard