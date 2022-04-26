import { FC } from 'react'
import AppHeader from '../components/app-header/app-header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/footer'

const MainLayout:FC = () => {
  return (
    <div className='page'>
        <AppHeader />
        <div>
          <div className="container">
              <Outlet/>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout