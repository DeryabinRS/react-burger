import { FC, useState, ChangeEvent } from "react";
import { Link, useLocation, Navigate } from 'react-router-dom'
import {
	Button,
	Input,
  	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchLogin } from "../services/store/actions/action-user";
import Alert from "../components/alert/alert";
import Loader from "../components/loader/loader";

const LoginPage: FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const location: any = useLocation()

	const fromPage = location.state?.from?.pathname || '/'

	const dispatch = useAppDispatch()
	const {user, isLoading, isError, message} = useAppSelector(store => store.userSlice)

	const handleLogin = (e:ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(email && password){
			dispatch(fetchLogin(email, password))
		}
	}

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	if(!!user) return <Navigate to={fromPage} replace/>

	return (
		<div className="container_center mt-25">
			<div><h2>Вход</h2></div>
			{ isLoading ? (<div className="mt-20"><Loader/></div>) : (
				<form onSubmit={handleLogin}>
					<div className="mt-6">
						<Input onChange={onChangeEmail} value={email} name={"email"} type="email" placeholder="email"/>
					</div>
					<div className="mt-6">
						<PasswordInput
							onChange={onChangePassword}
							value={password}
							name={"password"}
						/>
					</div>
					<div className="mt-6 text-center">
						<Button htmlType="submit">Войти</Button>
					</div>
				</form>
			)}
			
			{isError && <Alert type="danger" delay={2500}>{message}</Alert>}
			<div className="mt-20">Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></div>
			<div className="mt-4">Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></div>
		</div>
	);
};

export default LoginPage;
