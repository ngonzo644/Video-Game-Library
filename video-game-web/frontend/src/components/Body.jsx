import React from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Card from './Card.jsx'
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation.jsx";

const Body = ({trend, goat, fps, indie}) => {
  return (
    <>

      <div className= "flex flex-col space-y-10 pl-3 overflow-auto bg-gradient-to-r from-gray-500 via-gray-400 to-gray-700 pb-200">
      <Card title="Trending Games" vg={trend}  />
      <Card title="Must Plays" vg={goat} />
      <Card title="Iconic Shooters" vg={fps} />
      <Card title="Indie Games" vg={indie} />

      </div>
    </>
  )
}

export default Body