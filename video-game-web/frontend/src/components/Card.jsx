import React, {useEffect, useState} from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import TitleCard from './TitleCard.jsx'
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


// import {useState} from 'react'



const Card = ({title, vg}) => {

  const [seeMore, setSeeMore] = useState(null);

  const varLengthHalf = vg.length /2;
  const varLength = vg.length;


  

  console.log(seeMore);
  return (
    <>
    <div className="text-amber-50 ">

     <TitleCard title={title} seeMore={seeMore} setSeeMore={setSeeMore}/>
      <ul className="flex flex-wrap justify-center gap-2">
        {vg.length > 0 ? (
          seeMore!==title ? (
          vg.slice(0, varLengthHalf).map((game) => (
          <NavLink to={`/game/${game.id}`} key={game.id}>
              <li className = "group inline-flex flex-col items-center transition-transform duration-200 hover:scale-110 hover:shadow-lg hover:bg-amber-100 ease-in hover:font-bold hover:text-black"key={game.id}>
            {game.cover && (
            <div className="w-full h-64 rounded-xl">
            <img className="object-contain w-full h-full"
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} 
              alt="<No Image Found>" 
            />
            </div>

          )}
          
         <span className=" hidden group-hover:block max-w-[140px] truncate text-center group-hover:whitespace-normal group-hover:truncate-none group=hover:overflow-visible">
              {game.name}
            </span>

            
            </li>
            </NavLink>

            
        ))
        ):(

          vg.slice(varLengthHalf, varLength).map((game) => (
            <NavLink to={`/game/${game.id}`} key={game.id}>
            <li className = "group inline-flex flex-col items-center transition-transform duration-200 hover:scale-110 hover:shadow-lg hover:bg-amber-100 ease-in hover:font-bold hover:text-black"key={game.id}>
              {game.cover && (
              <div className="w-full h-64 rounded-xl">
              <img className="object-contain w-full h-full"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} 
                alt="<No Image Found>" 
              />
              </div>
  
            )}
            
           <span className=" hidden group-hover:block max-w-[140px] truncate text-center group-hover:whitespace-normal group-hover:truncate-none group-hover:overflow-visible">
                {game.name}
              </span>
  
              
  
              </li>
              </NavLink>


        ))
        ) 
        ) : (
        <Ring
          size="40"
          stroke="5"
          bgOPacity="0"
          speed="2"
          color="white"
          className="flex flex-col items-center"
        />)
      }
       <button  className="p-2 transition-all duration-200 hover:scale-140" onClick={()=>setSeeMore((prev)=>prev===title? prev=null: prev=title)}>
          {seeMore===title ? 
          <IoIosArrowBack size="3em"/>
          :
          <IoIosArrowForward size="3em"/>
          }

      </button>
      </ul>
      </div>

     
    </>

  )
}

export default Card