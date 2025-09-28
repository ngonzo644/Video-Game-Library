import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";



const GameInfo = () => {
  const { id } = useParams();          
  const [game, setGame] = useState(null);
  let [image, changeImage] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


  //runs when the id is changed
  useEffect(() => {
    const lookUp = async () => {
      try {
        const result = await fetch(`${API_URL}/games`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              fields name, rating, cover.url, summary, genres.name, platforms.name, first_release_date, release_dates.date, release_dates.human, screenshots.image_id;
              where id = ${id};
            `,
          }),
        });

        const data = await result.json();
        setGame(data[0]);  
      } catch (err) {
        console.error(err);
      }
    };

    lookUp();
  }, [id]);  

  
  if (!game) {
    return <div className="pt-30">Loading game info...</div>;
  }


  const getDeals = async ()=> {
    const resp = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(game.name)}&exact=0`);
    const data = await resp.json();
    // console.log(data[0].gameID);
    const pID = data[0]?.gameID;

    if(!pID){
      console.log('nada');
      return
    }


    const deal_resp = await fetch(`https://www.cheapshark.com/api/1.0/deals?gameID=${pID}`);
    const deal_data = await deal_resp.json();
    // console.log(deal_data);
    if (!deal_data.length){
      console.log('pls');
      return
    }
    console.log(deal_data[0].retailPrice);
  }

  getDeals();


  const scroll = (length)=>{
    changeImage(prev=>(prev===length-1? prev=0 : prev=prev+1));
    console.log(image);
  }

  const scroll_b = (length)=>{
    changeImage(prev=>(prev===0? prev=length-1 : prev=prev-1));
  }


  return (
    <main className="min-h-screen bg-white"> 
      <div className="relative flex flex-col min-h-screen w-full bg-center"> 
      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" ></div>
  
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-black text-center">
        <h1 className="text-5xl font-bold mt-2">{game.name}</h1>

        <div className ="flex flex-row justify-between items-center">

          <button className="transition-transform duration-200 hover:scale-110 hover:shadow-lg rounded-2xl" onClick={()=>scroll_b(game.screenshots.length)}>
            <IoIosArrowBack size="3em"/>
          </button>
          <img
          src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[image].image_id}.jpg`}
          alt={`${game.name} screenshot`}
          className="mt-6 rounded-lg z-11 max-w-[600px]"
          />

          <button  className="transition-transform duration-200 hover:scale-110 hover:shadow-lg rounded-2xl"onClick={()=>scroll(game.screenshots.length)}>
            <IoIosArrowForward size="3em"/>
          </button>
        </div>
        
        <div className="text-white flex flex-col items-center">  
          <p className="mt-2 max-w-2xl">{game.summary}</p>
          <p className="mt-2">Rating: {game.rating?.toFixed(1) || 'N/A'}</p>
          <p className="mt-1">Genre(s): {game.genres?.map(g => g.name).join(', ')}</p>
          <p className="mt-1">
            Available on: {game.platforms?.map(p => p.name).join(', ') || 'N/A'}
          </p>
          <p className='mt-2'>Released on: {game.release_dates?.find(d => d.date === game.first_release_date)?.human || "Unknown"} </p>
        </div>
  


      </div>


  
    </div>
    </main>
    
  );
};


export default GameInfo