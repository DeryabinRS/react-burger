import { FC, useState, ChangeEvent } from "react";
import { Link } from 'react-router-dom'
import {
	Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../hooks/redux";
import { fetchRegister } from "../services/store/actions/action-user";

const RegisterPage:FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  	const dispatch = useAppDispatch()

	const handlerRegister = () => {
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

	return (
		<div className="container_center mt-25">
			<div><h2>Регистрация</h2></div>
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
				<Button onClick={handlerRegister}>Зарегистрироваться</Button>
			</div>
			<div className="mt-20">Уже зарегистрирован? <Link to="/login">Войти</Link></div>
		</div>
	);
}

export default RegisterPage