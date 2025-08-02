import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header.jsx'
import {useEffect, useState} from 'react'




function App() {
  // created state for search bar
  const [query, setQuery] = useState('');

  // whenever query(user input) changes, run the API fetch through my backend
  useEffect( ()=>{

  if (!query) return;

  const getGames = async ()=>{
    const res = await fetch('http://localhost:3000/games', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: `search "${query}"; 
      fields name; limit 5;`})

    });

    const data = await res.json();
    console.log(data);
  }

  getGames();
}, [query]);


  return (
    <>
      <Header query={query} setQuery={setQuery}/>
    </>
  )
}

export default App
