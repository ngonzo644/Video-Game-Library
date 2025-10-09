import React from 'react'
import Body from '../components/Body.jsx'

const HomePage = ({trend, goat, fps, indie, seeMore, setSeeMore}) => {
  return (
    <>
      <Body trend={trend} goat={goat} fps={fps} indie={indie} seeMore={seeMore} setSeeMore={setSeeMore}/>
    </>
  )
}

export default HomePage