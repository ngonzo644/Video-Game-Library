import React from 'react'
import Body from '../components/Body.jsx'

const HomePage = ({trend, goat, fps}) => {
  return (
    <>
      <Body trend={trend} goat={goat} fps={fps}/>
    </>
  )
}

export default HomePage