import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header.jsx'


function App() {
  const getGames = async ()=>{
    const res = await fetch('http://localhost:3000/games', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: 'fields name; limit 10;'})

    });

    const data = await res.json();
    console.log(data);
  }

  getGames();


  return (
    <>
      <Header/>
    </>
  )
}

export default App
