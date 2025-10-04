import React from 'react'
import {useParams} from 'react-router-dom'

const ViewMore = () => {
  const {id} = useParams();
  return (
    <div  className="bg-white min-h-screen">
      Welcome to {id} video games!
    </div>
  )
}

export default ViewMore