import React from 'react'

const Body = ({games}) => {
  return (
    <>
    <div>
      {games.map(game=>game.name)}
    </div>
    </>
  )
}

export default Body