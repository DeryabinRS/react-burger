import { FC, useState, ChangeEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
	Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import Loader from '../components/loader/loader';
import Alert from '../components/alert/alert';
import { forgotPassword } from '../services/store/actions/action-user';

const ForgotPasswordPage:FC = () => {
	const [email, setEmail] = useState("");
	const [sendemail, setSendEmail] = useState(false)

	const dispatch = useAppDispatch()
	const {user, isLoading, isError, message} = useAppSelector(store => store.userSlice)

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSendToken = async () => {
		const success = await dispatch(forgotPassword(email))
		await setSendEmail(success)
	}

	if(!!user) return <Navigate to={'/'} replace/>

	if(sendemail) return <Navigate to={'/reset-password'} replace/>

	return (
		<div className="container_center mt-25">
			<div><h2>Восстановление пароля</h2></div>
		{ isLoading ? (<div className="mt-20"><Loader/></div>) : (
			<>
			<div className="mt-6">
				<Input onChange={onChangeEmail} value={email} name={"email"} type="email" placeholder="Укажите email"/>
			</div>
			<div className="mt-6">
				<Button onClick={handleSendToken}>Восстановить</Button>
			</div>
			</>
		)}
		{isError && <Alert type="danger" delay={2500}>{message}</Alert>}
			<div className="mt-20">Вспомнили пароль? <Link to="/login">Войти</Link></div>
		</div>
		
	);
}

export default ForgotPasswordPage