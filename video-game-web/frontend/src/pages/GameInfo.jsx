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
              fields name, rating, cover.url, summary, genres.name;
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
      {game.genres && (
        <ul>
          {game.genres.map((g) => (
            <li key={g.id}>{g.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default GameInfo