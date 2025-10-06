import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'




const ViewMore = () => {
  const {id} = useParams();
  const [genreInfo, setGenreInfo] = useState(null);

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
          setGenreInfo(data);
        }
        catch (error){
           console.error("Error w Wikipedia");
        }

      };

      fetchWikiSum();
  }, [id]);

  return (
    <main  className="bg-white min-h-screen">
      <div className="relative flex flex-col min-h-screen w-full bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" ></div>

        <div className="flex justify-center text-5xl font-bold">
          Welcome to {id} video games
        </div>

        <p>
          hi
        </p>

      </div> 

    </main>
  )
}

export default ViewMore