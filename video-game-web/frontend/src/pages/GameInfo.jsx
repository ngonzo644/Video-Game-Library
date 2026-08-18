import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { BeatLoader } from "react-spinners";
import {Link} from "react-scroll";
import { IoMdStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";




const GameInfo = () => {
  const { id } = useParams();          
  const [game, setGame] = useState(null);

  const [fav, setFav] = useState(false);
  
  
  let [image, changeImage] = useState(0);
  const [videoId, setVideoId] = useState(null);
  const [isBottom, setBottom] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const key = import.meta.env.VITE_API_KEY;

  // regular igdb fetch for game
  useEffect(() => {
    const lookUp = async () => {
      try {
        const result = await fetch(`${API_URL}/games`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              fields name, rating, cover.url, cover.image_id, summary, genres.name, platforms.name, first_release_date, release_dates.date, release_dates.human, screenshots.image_id, videos.video_id;
              where id = ${id};
            `,
          }),
        });

        const data = await result.json();
        console.log(data);
        setGame(data[0]);  
        setVideoId(data[0].videos[0].video_id);
        console.log(videoId);
      } catch (err) {
        console.error(err);
      }
    };

    lookUp();
  }, [id]);

  useEffect(() => {
    if (!game?.id) return;
  
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
  
    setFav(favorites.includes(game.id));
  }, [game]);

  // ***** youtube vid API fetch ******
  // useEffect(() => {
  //   if(!game?.name) return;
  //   if(videoId) return;
  //   const fetchVideo = async () => {
  //     try {   
  //       const res = await fetch(
  //         `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(game.name  + ' video game trailer official')}&type=video&maxResults=1&key=${key}`
  //       );
  //       const data = await res.json();
                
  //       if (data.items && data.items.length > 0) {
  //         setVideoId(data.items[0].id.videoId);
  //       } 

  //     } catch (error) {
  //       console.error('Error fetching YouTube video:', error);
  //     }
  //   };
  
  //   fetchVideo();
  // }, [game]);



  if (!game) {
    return <div className="pt-30">Loading game info...</div>;
  }


  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
  
    if (favorites.includes(game.id)) {
      // Remove
      const updatedFavorites = favorites.filter(
        id => id !== game.id
      );
  
      localStorage.setItem(
        'favorites',
        JSON.stringify(updatedFavorites)
      );
  
      setFav(false);
  
    } else {
      const updatedFavorites = [
        ...favorites,
        game.id
      ];
  
      localStorage.setItem(
        'favorites',
        JSON.stringify(updatedFavorites)
      );
  
      setFav(true);
    }
  };


  const scroll = (length) => {
    changeImage(prev => (prev === length - 1 ? 0 : prev + 1));
    console.log(image);
  }

  const scroll_b = (length) => {
    changeImage(prev => (prev === 0 ? length - 1 : prev - 1));
  }


  return (
    <main className="min-h-screen bg-white"> 
      <div className="relative flex flex-col min-h-screen w-full bg-center"> 
      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" ></div>
  
      <div className="fixed right-4 top-1/2 bg-gray-500 text-white p-4 rounded-lg shadow-lg z-50 scroll-smooth cursor-pointer">
      {isBottom? 
        (
        <Link
          to="section1"
          smooth={true}
          duration={1200}
          onClick={()=>setBottom(prev=>prev=!prev)}
          offset={-20}
          >
            Back up
        </Link>
        ):(

        <Link
          to="section2"
          smooth={true}
          duration={1200}
          onClick={()=>setBottom(prev=>prev=!prev)}
          >
            More info
        </Link>
        )
      }

      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-black text-center">


        <h1 className="text-5xl font-bold mt-10" id="section1">{game.name}</h1>


        <div className="flex flex-row bg-black rounded-2xl mt-10">
          <img className="rounded-2xl w-70"
            src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`} 
            alt="<No Image Found>" 
          />
          {videoId ? (
            <iframe 
              className="rounded-2xl"
              width="450" 
              height="400" 
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Game trailer"
            />
          ) : (
            <div className="w-[450px] h-[400px] bg-gray-800 rounded-2xl flex items-center justify-center text-white">
              <BeatLoader color={'white'}/>
            </div>
          )
          }
          </div>

        <div className="relative group">
          <button className="flex items-center px-3 py-1 text-lg text-white cursor-pointer transition-transform hover:scale-110" onClick={toggleFavorite} >
            {fav ? "Remove from favorites" : "Add to favorites"}

            {fav ? (
              <IoMdStar className="ml-1 mb-0.5 text-2xl text-yellow-400" />
            ) : (
              <IoMdStarOutline className="ml-1 mb-0.5 text-2xl text-white" />
            )}
          </button>
        </div>


        {/* start of game info */}
        
        <div className="text-white flex flex-col items-center">  
          <p className="mt-80 max-w-2xl" id="section2">{game.summary} </p>
          {/* start of screenshot */}
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
        {/* end of screenshot */}
          <p className="mt-2">Rating: {game.rating?.toFixed(1) || 'N/A'}</p>
          <p className="mt-1">Genre(s): {game.genres?.map(g => g.name).join(', ')}</p>
          <p className="mt-1">
            Available on: {game.platforms?.map(p => p.name).join(', ') || 'N/A'}
          </p>
          <p className='mt-2 mb-25'>Released on: {game.release_dates?.find(d => d.date === game.first_release_date)?.human || "Unknown"} </p>
        </div>
        {/* end of game info */}


      </div>


  
    </div>
    </main>
    
  );
};


export default GameInfo