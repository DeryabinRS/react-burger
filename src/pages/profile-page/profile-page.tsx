import { FC } from 'react'

import { Outlet } from 'react-router-dom'
import CustomLink from '../../components/custom-link/custom-link';
import { useAppDispatch } from '../../hooks/redux';
import { logoutRequest } from '../../services/store/actions/action-user';

const ProfilePage:FC = () => {

	const dispatch = useAppDispatch()
	

	const handleLogout = (e:any) => {
		e.preventDefault()
		dispatch(logoutRequest())
	}

	return (
		<div className="row mt-20 p-4">
			<div className='mr-15'>
				<div className='mb-8'><CustomLink to="/profile" ><h2>Профиль</h2></CustomLink></div>
				<div className='mb-8'><CustomLink to="/profile/orders"><h2>История заказов</h2></CustomLink></div>
				<div className='mb-8'><a href='/' onClick={handleLogout}><h2>Выход</h2></a></div>
			</div>
			<Outlet/>
		</div>
	)
}

export default ProfilePage