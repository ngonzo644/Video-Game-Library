import React, {useEffect, useState} from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import TitleCard from './TitleCard.jsx'
import { NavLink } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


// import {useState} from 'react'



const Card = ({title, vg}) => {
  const gamesPerView = 7;
  //pages is an array consisting of the current page a 'title' is currently on
  const [pages, setPages] = useState({});
  const currentPage = pages[title] || 0;
  const totalPages = Math.ceil(vg.length / gamesPerView);
  
  const start = currentPage * gamesPerView;
  const end = start + gamesPerView;
  
  const nextPage = () => {
    setPages((prev) => ({
      ...prev,
      [title]:
        currentPage >= totalPages - 1
          ? 0
          : currentPage + 1,
    }));
  };
  
  const prevPage = () => {
    setPages((prev) => ({
      ...prev,
      [title]:
        currentPage <= 0
          ? totalPages - 1
          : currentPage - 1,
    }));
  };
  
  return (
    <div className="text-amber-50">
      <TitleCard title={title} />
  
      <div className="flex items-center justify-center gap-4">
        <button
          className="p-2 transition-all duration-200 hover:scale-125"
          onClick={prevPage}
        >
          <IoIosArrowBack size="3em" />
        </button>
  
        <ul className="flex flex-wrap justify-center gap-2">
          {vg.length > 0 ? (
            vg.slice(start, end).map((game) => (
              <NavLink to={`/game/${game.id}`} key={game.id}>
                <li className="group inline-flex flex-col items-center transition-transform duration-200 hover:scale-110 hover:bg-amber-100 ease-in hover:font-bold hover:text-black">
                  {game.cover && (
                    <div className="w-full h-64 rounded-xl">
                      <img
                        className="object-contain w-full h-full"
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                        alt={game.name}
                      />
                    </div>
                  )}
  
                  <span className="hidden group-hover:block max-w-[140px] truncate text-center group-hover:whitespace-normal group-hover:truncate-none group-hover:overflow-visible">
                    {game.name}
                  </span>
                </li>
              </NavLink>
            ))
          ) : (
            <Ring
              size="40"
              stroke="5"
              bgOpacity="0"
              speed="2"
              color="white"
              className="flex flex-col items-center"
            />
          )}
        </ul>
  
        <button
          className="p-2 transition-all duration-200 hover:scale-125"
          onClick={nextPage}
        >
          <IoIosArrowForward size="3em" />
        </button>
      </div>
    </div>
  )  
}

export default Card