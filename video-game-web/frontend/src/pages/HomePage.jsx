import React from 'react'
import Body from '../components/Body.jsx'

const HomePage = ({trend, goat, fps, indie}) => {
  return (
    <>
      <Body trend={trend} goat={goat} fps={fps} indie={indie} />
    </>
  )
}

export default HomePage