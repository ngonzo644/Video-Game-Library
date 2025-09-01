import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header.jsx'
import {useEffect, useState} from 'react'
import Body from './components/Body.jsx'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import GameInfo from './pages/GameInfo.jsx'




function App() {
  // created state for search bar
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [trend, setTrend] = useState([]);
  const [goat, setGoat] = useState([]);
  const [fps, setFps] = useState([]);
  const [genres, setGenres] = useState([]);

  const searchTerm = "Stealth";

  useEffect(() => {
    const fetchGenres = async () => {
        const res = await fetch("http://localhost:3000/genres", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `fields id, name; where name ~ *"${searchTerm}"*; limit 5;`
          })
        });

        const data = await res.json();
        setGenres(data);
        console.log(data);
    };

    fetchGenres();
  }, []);
  



  // whenever query(user input) changes, run the API fetch through my backend
  useEffect( ()=>{

  if (!query) return;

  const getGames = async ()=>{
    const result = await fetch('http://localhost:3000/games', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: `search "${query}"; 
      fields name,rating; where rating > 75; limit 5;`})

    });

    const data = await result.json();
    setGames(data);
    console.log(data);
  }

  getGames();
}, [query]);

//todays current date
const today = Math.floor(Date.now()/1000);
const month = today-60*60*24*30;
//  for trending games
useEffect (()=>{
  const getTrend = async ()=>{
    const result = await fetch('http://localhost:3000/games', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: ` 
        fields name, first_release_date, total_rating, total_rating_count, follows, cover.image_id;
        where first_release_date < ${today} & first_release_date > ${month} &total_rating>80 & hypes!=null; sort total_rating_count desc;
        limit 7;`})
  
      });
  
    const data = await result.json();
    setTrend(data);
  
  }
  
  getTrend();
}, []); 

//greatest of all time
useEffect (()=>{
  const getGoat = async ()=>{
    const result = await fetch('http://localhost:3000/games', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: ` 
        fields name, total_rating, total_rating_count, cover.image_id, game_modes;
        where total_rating > 80 & game_modes=(1) & genres=(12,5); 
        sort total_rating_count desc;
        limit 7;`})
  
      });
  
    const data = await result.json();
    console.log(data);
    setGoat(data);
  
  }
  
  getGoat();
}, []); 

useEffect (()=>{
  const getFps = async ()=>{
    const result = await fetch('http://localhost:3000/games', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: ` 
        fields name, total_rating, total_rating_count, cover.image_id, game_modes;
        where genres=(5) & total_rating>80 & game_modes=(4); 
        sort total_rating_count desc;
        limit 7;`})
  
      });
  
    const data = await result.json();
    console.log(data);
    setFps(data);
  
  }
  
  getFps();
}, []); 


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path ='/' element={<MainLayout query={query} setQuery={setQuery} games={games}/>}>
      <Route index element={<HomePage trend={trend} goat={goat} fps={fps}/>}/>
      <Route path='game/:id' element={<GameInfo/>}/>

    </Route>
  ))

  return (
    <RouterProvider router={router}/>

  )
}

export default App
