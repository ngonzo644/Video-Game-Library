import React from 'react'
import Card from '../components/Card'
import { useEffect, useState } from 'react';


const Favorites = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

useEffect(() => {
  const getFavoriteGames = async () => {
    try {

      const favoriteIds = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      );

      console.log("Favorite IDs:", favoriteIds);



      if (favoriteIds.length === 0) {
        setGames([]);
        setLoading(false);
        return;
      }


      const response = await fetch(
        `${API_URL}/favorite-games`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            gameIds: favoriteIds
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Favorite games:", data);

      setGames(data);

    } catch (error) {
      console.error(
        "Error getting favorite games:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  getFavoriteGames();

}, []);


  return (
    <main className="bg-white min-h-screen">
      <Card title="Favorites" vg={games}  />
    </main>
  )
}

export default Favorites