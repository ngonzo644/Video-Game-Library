import React from 'react'
import {Ring} from 'ldrs/react'
import 'ldrs/react/Ring.css'
import Card from '../components/Card.jsx'
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation.jsx";

const Body = ({trend, goat}) => {
  return (
    <>
    <BackgroundGradientAnimation>

      <div className= "flex flex-col items-center justify-start pt-32 space-y-10 ">
      <Card title="Trending Games" vg={trend} />
      <Card title="Must Plays" vg={goat}/>
      </div>
    </BackgroundGradientAnimation>
    </>
  )
}

export default Body