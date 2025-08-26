import React from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Card from '../components/Card.jsx'

const Body = ({trend, goat}) => {
  return (
    <>
    <div className= "bg-gray-500">
    <Card title="Trending Games" vg={trend} />
    <Card title="Must Plays" vg={goat}/>
    </div>
    </>
  )
}

export default Body