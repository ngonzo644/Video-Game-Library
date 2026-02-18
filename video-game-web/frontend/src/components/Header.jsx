import React from 'react'
import {useState} from 'react'
import { GoSearch } from "react-icons/go";
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../images/bookcase.png'

const Header = ({ query, setQuery, games }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [imagePreviewID, setImagePreviewID] = useState(null);
  const  currentURL = window.location.pathname;
  console.log(currentURL);
  const navigate= useNavigate();

  const gameInput = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true); 
  }

  const enter = ()=>{
    navigate(`/game/${games[0].id}`, {state: {game:games[0]}});
  }

  const items = ['playstation', 'xbox', 'PC', 'switch'];

  return (
    <>
      <div className="z-100 w-full">
        <div 
          className="sticky top-0 z-50 text-center flex flex-row justify-between bg-gray-800 p-10"
          onMouseLeave={() => setShowDropdown(false)} 
        >
          <NavLink to="/">


          <div className="relative group">
            <button className="flex text-center text-white transition-transform hover:scale-110 cursor-pointer text-lg px-3 py-1 hover:border hover:rounded-xl hover:border-">

            <img className="w-10 h-10 inline"src={logo} alt="chicke"/>
            <div className="flex justify-start text-white inline">
              {(currentURL=='/'? <p>Game Library</p> : <p> Return Home</p>) }
            </div>
            <div className="absolute top-full  rounded-lg p-3 mt-1 shadow-md bg-white text-black scale-y-0 group-hover:scale-y-100 origin-top duration-200 transform cursor-pointer">
              <p className="block px-2 py-1 hover:bg-gray-100 rounded">
                Trending Games
              </p>
              <p className="block px-2 py-1 hover:bg-gray-100 rounded">
                Top 100
              </p>
            </div>

            </button>
       
            </div>
          </NavLink>

          

          <div className="flex flex-1 justify-center text-white ">
            <form action="" className="w-full max-w-md" onSubmit={enter}>
              <div className="relative">
                <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none"/>
                <input 
                  type="text" 
                  className="w-full pl-10 pr-3 py-2 border-solid border-white text-black rounded-2xl bg-white font-semibold placeholder-gray-500 ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2" 
                  placeholder="Search game(s)..." 
                  value={query} 
                  onChange={gameInput} 
                  autoComplete="off"
                  onFocus={() => setShowDropdown(true)} 
                />

                {/* Dropdown only shows when query not empty AND showDropdown is true */}
                {query.trim() !== '' && showDropdown && (
                  games.length > 0 ? (
                    <ul className="border overflow-visible h-60 absolute w-full bg-white text-black rounded-md shadow-lg">
                      {games.map((g) => (
                        <NavLink to={`/game/${g.id}`} key={g.id}>
                          <li 
                            className="px-3 py-2 hover:bg-yellow-50 hover:text-black cursor-pointer relative"
                            onMouseOver={()=>setImagePreviewID(g.id)}
                            onMouseLeave={()=>setImagePreviewID(null)}
                          >
                            {g.name}
                            {
                              imagePreviewID === g.id && g.cover?.image_id &&(
                                <img className="absolute -top-8 right-0 mt-2 mr-2 w-24 rounded shadow-lg "
                                  src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${g.cover.image_id}.jpg`} 
                                  alt="<No Image Found>" 
                                />
                              )}
                          </li>
                        </NavLink>
                      ))}
                    </ul>
                  ) : (
                    <div className="border flex justify-center items-center h-60 absolute w-full bg-white text-black rounded-md shadow-lg">
                      No Games Found
                    </div>
                  )
                )}
              </div>
            </form>
          </div>

          <div className="relative group">
            <button className="flex text-center text-white transition-transform hover:scale-110 cursor-pointer text-lg px-3 py-1 hover:border hover:rounded-xl hover:border-">
              Platforms
            </button>
            <div className="absolute top-full  rounded-lg p-3 mt-1 shadow-md bg-white text-black scale-y-0 group-hover:scale-y-100 origin-top duration-200 transform cursor-pointer">
            <NavLink className="block px-2 py-1 hover:bg-gray-100 rounded" to={`/category/playstation`} key={"Playstation"}>
              Playstation
            </NavLink>

            <NavLink className="block px-2 py-1 hover:bg-gray-100 rounded" to={`/category/xbox`} key={"Xbox"}>
              Xbox
            </NavLink>            
            
            <NavLink className="block px-2 py-1 hover:bg-gray-100 rounded" to={`/category/PC`} key={"Steam"}>
              PC/Steam
            </NavLink>
            </div>
          </div>

       
        </div>
      </div>
    </>  
  )
}
export default Header