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
              fields name, rating, cover.url, summary, genres.name, platforms.name;
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
    console.log(data[0].gameID);
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
    <div className="pt-30">
      <h1 className="text-2xl font-bold">{game.name}</h1>
      {game.cover && (
        <img
          src={game.cover.url}
          alt={game.name}
          className="rounded-lg shadow-lg"
        />
      )}
      <p>{game.summary}</p>
      <p>Rating: {game.rating?.toFixed(1) || 'N/A'}</p>
      <p>Genre(s): {game.genres?.map(g => g.name).join(', ')}</p>
      <p>Available on: {game.platforms?.map(p => p.name).join(', ') || 'N/A'}</p>
    </div>
  );
};


export default GameInfo