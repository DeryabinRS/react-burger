import { FC, useState, ChangeEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
	Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import Loader from '../components/loader/loader';
import Alert from '../components/alert/alert';
import { resetPassword } from '../services/store/actions/action-user';

const ResetPasswordPage:FC = () => {
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [ changedPassword, setchangedPassword ] = useState(false)

	const dispatch = useAppDispatch()

	const location:any = useLocation()

	const {user, isLoading, isError, message} = useAppSelector(store => store.userSlice)

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	};

	const handleChangedPassword = async () => {
		const success = await dispatch(resetPassword(password, code))
		await setchangedPassword(success)
	}

	
	if(!!user) return <Navigate to={'/'} replace/>
	
	if(!location.state) return <Navigate to={'/forgot-password'} replace/>

	return (
		<div className="container_center mt-25">
			<div><h2>Восстановление пароля</h2></div>
		{ isLoading ? <div className="mt-20"><Loader/></div>
			: !changedPassword ? 
			<form onSubmit={handleChangedPassword}>
				<div className="mt-6">
					<PasswordInput onChange={onChangePassword} value={password} name={"password"} />
				</div>
				<div className="mt-6">
					<Input onChange={onChangeCode} value={code} name={"code"} placeholder={"Введите код из письма"} />
				</div>
				<div className="mt-6 text-center">
					<Button htmlType='submit'>Сохранить</Button>
				</div>
			</form>
			: <Alert type="success" delay={5000}>{message}</Alert>
		}
		{isError && <Alert type="danger" delay={2500}>{message}</Alert>}
			<div className="mt-20">Вспомнили пароль? <Link to="/login">Войти</Link></div>
		</div>
	);
}

export default ResetPasswordPage