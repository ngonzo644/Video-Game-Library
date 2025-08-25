import React from 'react'

const Body = ({trend, goat}) => {
  return (
    <>
    <div className= "bg-gray-500">
    <h2>
      Trending Games: 
    </h2>
    <ul>
        {trend.length > 0 ? (
          trend.map((game) => (
          <li className="bg-blue-400 border border-black rounded-2xl px-2 py-3 mr-200"key={game.id}>{game.name}</li>
        ))
        ) : (
        <p>Loading Games...</p>)
      }
      </ul>
      <h3 className = 'mt-4 '>
      Must Plays:
      <ul>
        {goat.length > 0 ? (
          goat.map((game) => (
          <li className = "bg-blue-300 border border-black rounded-2xl px-2 py-3  inline-block transition-transform duration-200 hover:scale-110 hover:shadow-lg hover:bg-amber-200 ease-in hover:font-bold"key={game.id}>
            {game.name}
            {game.cover && (
            <img 
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} 
              alt="<No Image Found>" 
            />
          )}
            </li>
        ))
        ) : (
        <p>Loading Games...</p>)
      }
      </ul>
      </h3>
    </div>
    </>
  )
}

export default Body