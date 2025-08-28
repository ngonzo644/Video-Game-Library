import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.jsx'


const MainLayout = ({query, setQuery, games}) => {
  return (
    <>
      <Header query={query} setQuery={setQuery} games={games}/>
      <Outlet/>
    </>
  )
}

export default MainLayout