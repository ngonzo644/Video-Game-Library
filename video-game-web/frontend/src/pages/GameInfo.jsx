import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

const GameInfo = () => {
  const { id } = useParams();          
  const [game, setGame] = useState(null);
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
              fields name, rating, cover.url, summary, genres.name, platforms.name, first_release_date, release_dates.date, release_dates.human;
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



  return (
    <main className="pt-24"> 
      <div className="relative h-screen w-full bg-cover bg-center" 
      style={{
      backgroundImage: `url(${game.cover?.url.replace("t_thumb", "t_original")})`,
       }}
      >
       {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
  
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-5xl font-bold">{game.name}</h1>
        <p className="mt-4 max-w-2xl">{game.summary}</p>
        <p className="mt-2">Rating: {game.rating?.toFixed(1) || 'N/A'}</p>
        <p className="mt-1">Genre(s): {game.genres?.map(g => g.name).join(', ')}</p>
        <p className="mt-1">
          Available on: {game.platforms?.map(p => p.name).join(', ') || 'N/A'}
        </p>
        <p className='mt-2'>Released on: {game.release_dates?.find(d => d.date === game.first_release_date)?.human || "Unknown"} </p>
      </div>

    </div>
    </main>
    
  );
};


export default GameInfo