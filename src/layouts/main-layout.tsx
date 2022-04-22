import { FC } from 'react'
import AppHeader from '../components/app-header/app-header'
import { Outlet } from 'react-router-dom'

const MainLayout:FC = () => {
  return (
    <>
        <AppHeader />
        <div className="container">
            <Outlet/>
        </div>
    </>
  )
}

export default MainLayout