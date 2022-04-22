import { FC, useState, ChangeEvent } from "react";
import { Link } from 'react-router-dom'
import {
	Button,
	Input,
  	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container_center mt-25">
		<div><h2>Вход</h2></div>
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
		<div className="mt-6">
			<Button>Войти</Button>
		</div>
		<div className="mt-20">Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></div>
		<div className="mt-4">Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></div>
    </div>
  );
};

export default LoginPage;
