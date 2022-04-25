import { useState, ChangeEvent,FC } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logoutRequest } from '../services/store/actions/action-user';

const ProfilePage:FC = () => {

	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.userSlice)

	const [name, setName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [password, setPassword] = useState("");
	
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleLogout = () => {
		dispatch(logoutRequest())
	}

	return (
		<div className="row mt-20 p-4">
			<div className='mr-15'>
				<div className='mb-8'><NavLink to="/profile"><h2>Профиль</h2></NavLink></div>
				<div className='mb-8'><NavLink to="/profile"><h2>История заказов</h2></NavLink></div>
				<div className='mb-8'><a href="#" onClick={handleLogout}><h2>Выход</h2></a></div>
			</div>
			<div>
				<div><Input icon={'EditIcon'} onChange={onChangeName} value={name} name={'name'} placeholder='Имя'/></div>
				<div className='mt-6'><Input icon={'EditIcon'} onChange={onChangeEmail} value={email} type={'email'} name={'email'} placeholder='Логин'/></div>
				<div className='mt-6'><Input icon={'EditIcon'} onChange={onChangePassword} value={password} type={'password'} name={'password'} placeholder='Пароль'/></div>
			</div>
		</div>
	)
}

export default ProfilePage