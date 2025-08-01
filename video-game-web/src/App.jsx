import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header.jsx'
import {useEffect, useState} from 'react'


function App() {

  useEffect( ()=>{
  const getGames = async ()=>{
    const res = await fetch('http://localhost:3000/games', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: `search "Halo"; 
      cover.url, first_release_date, genres.name, rating; limit 5;`})

    });

    const data = await res.json();
    console.log(data);
  }

  getGames();
}, []);


  return (
    <>
      <Header/>
    </>
  )
}

export default App
