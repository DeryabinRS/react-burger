import { FC, useState, ChangeEvent } from "react";
import { Link, Navigate } from 'react-router-dom'
import {
	Button,
	EmailInput,
	PasswordInput,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchRegister } from "../services/store/actions/action-user";
import Alert from "../components/alert/alert";
import Loader from "../components/loader/loader";

const RegisterPage:FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  	const dispatch = useAppDispatch()
	const {user, isLoading, isError, message} = useAppSelector(store => store.userSlice)

	const handleRegister = () => {
		if(name && email && password){
			dispatch(fetchRegister(email, password, name))
		}
	}

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	if(!!user) return <Navigate to={'/'} replace/>

	return (
		<div className="container_center mt-25">
			<div><h2>Регистрация</h2></div>
			{ isLoading ? (<div className="mt-20"><Loader/></div>) : (
			<>
				<div className="mt-6">
					<Input onChange={onChangeName} value={name} name={"name"} placeholder={"Имя"}/>
				</div>
				<div className="mt-6">
					<EmailInput onChange={onChangeEmail} value={email} name={"email"} />
				</div>
				<div className="mt-6">
					<PasswordInput
						onChange={onChangePassword}
						value={password}
						name={"password"}
					/>
				</div>
				<div className="mt-6">
					<Button onClick={handleRegister}>Зарегистрироваться</Button>
				</div>
			</>
			)}
			{isError && <Alert type="danger">{message}</Alert>}
			<div className="mt-20">Уже зарегистрирован? <Link to="/login">Войти</Link></div>
		</div>
	);
}

export default RegisterPage