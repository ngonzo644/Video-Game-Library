import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header.jsx'
import {useEffect, useState} from 'react'
import Body from './components/Body.jsx'




function App() {
  // created state for search bar
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);

  // whenever query(user input) changes, run the API fetch through my backend
  useEffect( ()=>{

  if (!query) return;

  const getGames = async ()=>{
    const res = await fetch('http://localhost:3000/games', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: `search "${query}"; 
      fields name,rating; where rating > 75; limit 5;`})

    });

    const data = await res.json();
    setGames(data);
    console.log(data);
  }

  getGames();
}, [query]);


  return (
    <>
      <Header query={query} setQuery={setQuery} games={games}/>
      <Body games={games}/>
    </>
  )
}

export default App
