import React from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Card from '../components/Card.jsx'
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation.jsx";

const Body = ({trend, goat, fps}) => {
  return (
    <>

      <div className= "flex flex-col pt-32 space-y-10 pl-3 overflow-auto bg-gradient-to-r from-gray-500 via-gray-400 to-gray-700 pb-200">
      <Card title="Trending Games" vg={trend} />
      <Card title="Must Plays" vg={goat}/>
      <Card title="Iconic Shooters" vg={fps}/>
      </div>
    </>
  )
}

export default Body