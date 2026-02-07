import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import TitleCard from '../components/TitleCard'
import Card from '../components/Card.jsx'



const ViewMore = ({platform, setPlatform, seeMore, setSeeMore}) => {
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
          console.log(data);
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none" ></div>

        {/* <div className="flex justify-center text-5xl font-bold">
          {id} 
        </div> */}

        
        <Card title="Playstation Classics" vg={platform} seeMore={seeMore} setSeeMore={setSeeMore} />

        <p>
          {/* {genreInfo.extract} */}
        </p>

      </div> 

    </main>
  )
}

export default ViewMore