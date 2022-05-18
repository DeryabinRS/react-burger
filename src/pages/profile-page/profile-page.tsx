import { FC, SyntheticEvent } from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import CustomLink from '../../components/custom-link/custom-link';
import { useAppDispatch } from '../../hooks/redux';
import { logoutRequest } from '../../services/store/actions/action-user';

const ProfilePage:FC = () => {

	const dispatch = useAppDispatch()
	const location = useLocation()
	
	const handleLogout = (e:SyntheticEvent):void => {
		e.preventDefault()
		dispatch(logoutRequest())
	}

	return (
		<div className="row mt-20 p-4">
			<div className='mr-15 profile_menu'>
				<div className='mb-8'><CustomLink to="/profile" ><h2>Профиль</h2></CustomLink></div>
				<div className='mb-8'><CustomLink to="/profile/orders"><h2>История заказов</h2></CustomLink></div>
				<div className='mb-8'><a href='/' onClick={handleLogout}><h2>Выход</h2></a></div>
				<div className='mt-20 text_color_inactive'>
					{location.pathname === '/profile' && "В этом разделе вы можете изменить свои персональные данные"}
					{location.pathname === '/profile/orders' && "В этом разделе вы можете просмотреть свою историю заказов"}
				</div>
			</div>
			<Outlet/>
		</div>
	)
}

export default ProfilePage