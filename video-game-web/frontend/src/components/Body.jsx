import React, {useEffect, useState} from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Card from './Card.jsx'
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation.jsx";




const Body = ({trend, goat, fps, indie}) => {

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [gameoty, setGameoty] = useState([]);
  const [fighting, setFighting] = useState([]);

  useEffect (()=>{
    const getFighting = async ()=>{
      const result = await fetch(`${API_URL}/games`, {
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({query: ` 
          fields name, total_rating, total_rating_count, cover.image_id, game_modes;
          where genres=(4) & total_rating>82 & id!=(3156, 10039, 6030, 25838, 188, 5623, 119342, 1626, 13106); 
          sort total_rating_count desc;
          limit 49;`})
    
        });
    
      const data = await result.json();
      // console.log(data);
      setFighting(data);
    
    }
    
    getFighting();
  }, []); 
  useEffect (() =>{
    const getOTY = async ()=>{
      const result = await fetch (`${API_URL}/games`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: 
        `fields id, name, cover.image_id, first_release_date;
        where id=(119171, 303811, 305152, 119133, 76882, 8173, 19560, 1942, 135243, 26192, 7346); 
        sort first_release_date desc;`})
  
      });
      const data = await result.json();
      console.log(data);
      // console.log("yo?");
      setGameoty(data);
  
    }
  
    getOTY();
  }, []);


  return (
    <>

      <div className= "flex flex-col space-y-10 pl-3 overflow-auto bg-gradient-to-r from-gray-500 via-gray-400 to-gray-700 pb-200">
      <Card title="Trending Games" vg={trend}  />
      <Card title="Must Plays" vg={goat} />
      <Card title="Iconic Shooters" vg={fps} />
      <Card title="Indie Games" vg={indie} />
      <Card title="Fighting Games" vg={fighting}/>
      <Card title= "Game of The Year" vg={gameoty} />
      

      </div>
    </>
  )
}

export default Body