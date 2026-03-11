import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import TitleCard from '../components/TitleCard'
import Card from '../components/Card.jsx'



const ViewMore = ({platform, setPlatform}) => {
  const {id} = useParams();
  const [genreInfo, setGenreInfo] = useState(null);
  const [xbox, setXbox] = useState([]);
  const [pc, setPC] = useState([]);
  const [ps2, setPs2] = useState([]);
  const [ps4, setPs4] = useState([]);
  const [hundo, setHundo] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


  useEffect (() =>{
    const getXbox = async ()=>{
      const result = await fetch (`${API_URL}/games`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: 
        `fields name, id, total_rating, total_rating_count, cover.image_id, platforms;
        where platforms=(11, 12) & platforms !=(6, 38, 130, 21, 29) & total_rating>80; 
        sort total_rating_count desc;
        limit 14;`})
  
      });
      const data = await result.json();
      console.log(data);
      // console.log("yo?");
      setXbox(data);
  
    }
  
    getXbox();
  }, []);


  useEffect (() =>{
    const getPC = async ()=>{
      const result = await fetch (`${API_URL}/games`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: 
        `fields name, id, total_rating, total_rating_count, cover.image_id, platforms;
        where platforms=(6) & platforms !=(34, 48, 11, 39) & total_rating>80 & id!=(472, 74, 73,434, 538, 501, 500, 533, 75);  
        sort total_rating_count desc;
        limit 14;`})
  
      });
      const data = await result.json();
      console.log(data);
      // console.log("yo?");
      setPC(data);
  
    }
  
    getPC();
  }, []);

  useEffect (() =>{
    const getPs2 = async ()=>{
      const result = await fetch (`${API_URL}/games`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: 
        `fields name, id, total_rating, total_rating_count, cover.image_id, platforms;
        where platforms=(8) & platforms !=(34, 48, 11, 39) & id!=(231, 327) & total_rating>80;  
        sort total_rating_count desc;
        limit 14;`})
  
      });
      const data = await result.json();
      console.log(data);
      // console.log("yo?");
      setPs2(data);
  
    }
  
    getPs2();
  }, []);



  useEffect(()=>{
      if (id==="Trending Games" || id==="Must Plays" || id==="Iconic Shooters"){
        return;
      }
      const fetchWikiSum = async ()=>{
        try{
          const formatted = `${id.replace(/\s+/g, "_")}`;
          const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(formatted)}`
          );
          const data = await res.json();
          console.log(data);
          setGenreInfo(data);
        }
        catch (error){
           console.error("Error w Wikipedia");
        }

      };

      fetchWikiSum();
  }, [id]);

  useEffect (() =>{
    const getPs4 = async ()=>{
      const result = await fetch (`${API_URL}/games`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: 
        `fields name, id, total_rating, total_rating_count, cover.image_id, platforms;
        where platforms=(48) & platforms !=(34, 9, 41, 508, 11, 39, 46, 49) & id!=(7351, 1942, 25076) & total_rating>80;  
        sort total_rating_count desc;
        limit 14;`})
  
      });
      const data = await result.json();
      console.log(data);
      // console.log("yo?");
      setPs4(data);
  
    }
  
    getPs4();
  }, []);

  useEffect (()=>{
    const getHundo = async ()=>{
      const result = await fetch(`${API_URL}/games`, {
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({query: ` 
          fields name, id, total_rating, total_rating_count, cover.image_id, game_modes; 
          sort total_rating_count desc;
          limit 100;`})
    
        });
    
      const data = await result.json();
      // console.log(data);
      setHundo(data);
    
    }
    
    getHundo();
  }, []); 


  

  return (
    <main  className="bg-white min-h-screen">
      <div className="relative flex flex-col min-h-screen w-full bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent pointer-events-none" ></div>

        {/* <div className="flex justify-center text-5xl font-bold">
          {id} 
        </div> */}

        {id === "playstation"? 

        <div className="mb-400 flex gap-4"> 
            <Card title="Playstation Classics" vg={platform}  />

            <Card  title="PS2" vg={ps2} />

            <Card title="PS4" vg={ps4} />

        </div>
       
        :
        id ==="xbox"?
      
          <Card title = "Xbox classics" vg={xbox} />
        :
        id ==="PC"?
        
        <Card title = "PC greats" vg={pc}  /> :

        <Card title = "Top 100 (No particular order)" vg={hundo} />

      }
  
       
        <p>
          {/* {genreInfo.extract} */}
        </p>

      </div> 

    </main>
  )
}

export default ViewMore