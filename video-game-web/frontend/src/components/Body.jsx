import React, {useEffect, useState} from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Card from './Card.jsx'
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation.jsx";




const Body = ({trend, goat, fps, indie}) => {

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [gameoty, setGameoty] = useState([]);

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
      <Card title= "Game of The Year" vg={gameoty} />

      </div>
    </>
  )
}

export default Body