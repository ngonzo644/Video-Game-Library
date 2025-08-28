import React from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import TitleCard from '../components/TitleCard.jsx'
import { NavLink } from 'react-router-dom';



const Card = ({title, vg}) => {
  return (
    <>
    <h2 className="text-amber-50">
     <TitleCard title={title}/>
      <ul>
        {vg.length > 0 ? (
          vg.map((game) => (
          <NavLink to="/game" key={game.id}>
          <li className = "group bg-gray-800 border border-black rounded-2xl px-2 py-3  inline-flex flex-col items-center transition-transform duration-200 hover:scale-110 hover:shadow-lg hover:bg-amber-100 ease-in hover:font-bold hover:text-black "key={game.id}>
            <span className=" block max-w-[150px] truncate text-center group-hover:whitespace-normal group-hover:truncate-none group=hover:overflow-visible">
              {game.name}
            </span>
            {game.cover && (
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${game.cover.image_id}.jpg`} 
              alt="<No Image Found>" 
            />
          )}
            </li>
            </NavLink>
            
        ))
        ) 
        : (
        <Ring
          size="40"
          stroke="5"
          bgOPacity="0"
          speed="2"
          color="white"
          className="flex flex-col items-center"
        />)
      }
      </ul>
      </h2>
    </>
  )
}

export default Card