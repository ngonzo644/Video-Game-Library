import React from 'react'
import Body from '../components/Body.jsx'

const HomePage = ({trend, goat}) => {
  return (
    <>
      <Body trend={trend} goat={goat}/>
    </>
  )
}

export default HomePage