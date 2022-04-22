import { FC, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import {
	Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPasswordPage:FC = () => {
  const [email, setEmail] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="container_center mt-25">
		<div><h2>Восстановление пароля</h2></div>
    <div className="mt-6">
			<Input onChange={onChangeEmail} value={email} name={"email"} type="email" placeholder="Укажите email"/>
		</div>
    <div className="mt-6">
			<Button>Восстановить</Button>
		</div>
		<div className="mt-20">Вспомнили пароль? <Link to="/login">Войти</Link></div>
    </div>
  );
}

export default ForgotPasswordPage