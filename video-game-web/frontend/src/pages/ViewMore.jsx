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
        where platforms=(11, 12, 49) & platforms !=(6, 38, 130, 21, 29) & total_rating>65 | id = (740, 986, 989, 987); 
        sort total_rating_count desc ;
       `})
  
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
        where platforms=(6) & platforms !=(34, 48, 11, 39) & total_rating>65 & id!=(472, 74, 73,434, 538, 501, 500, 533, 75);  
        sort total_rating_count desc;
       `})
  
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
        `})
  
      });
      const data = await result.json();
      console.log(data);
      // console.log("yo?");
      setPs2(data);
  
    }
  
    getPs2();
  }, []);



  // useEffect(()=>{
  //     if (id==="Trending Games" || id==="Must Plays" || id==="Iconic Shooters"){
  //       return;
  //     }
  //     const fetchWikiSum = async ()=>{
  //       try{
  //         const formatted = `${id.replace(/\s+/g, "_")}`;
  //         const res = await fetch(
  //           `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(formatted)}`
  //         );
  //         const data = await res.json();
  //         console.log(data);
  //         setGenreInfo(data);
  //       }
  //       catch (error){
  //          console.error("Error w Wikipedia");
  //       }

  //     };

  //     fetchWikiSum();
  // }, [id]);

  useEffect (() =>{
    const getPs4 = async ()=>{
      const result = await fetch (`${API_URL}/games`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: 
        `fields name, id, total_rating, total_rating_count, cover.image_id, platforms;
        where platforms=(48) & platforms !=(34, 9, 41, 508, 11, 39, 46, 49) & id!=(7351, 1942, 25076) & total_rating>80;  
        sort total_rating_count desc;
        `})
  
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
        {/* <div className="flex justify-center text-5xl font-bold">
          {id} 
        </div> */}


        <div className= "flex flex-col space-y-10 pl-3 overflow-auto bg-gradient-to-r from-gray-500 via-gray-400 to-gray-700 pb-200">
          <Card title="Playstation Classics" vg={platform}  />

          <Card  title="PS2" vg={ps2} />

          <Card title="PS4" vg={ps4} />
          <Card title = "Xbox classics" vg={xbox} />
          <Card title = "PC greats" vg={pc}  /> 

        </div>

       
      </div> 

    </main>
  )
}

export default ViewMore