import { FC, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import {
	Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPasswordPage:FC = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className="container_center mt-25">
		<div><h2>Восстановление пароля</h2></div>
    <div className="mt-6">
			<PasswordInput onChange={onChangePassword} value={password} name={"password"} />
		</div>
    <div className="mt-6">
			<Input onChange={onChangeCode} value={code} name={"code"} placeholder={"Введите код из письма"} />
		</div>
    <div className="mt-6">
			<Button>Сохранить</Button>
		</div>
		<div className="mt-20">Вспомнили пароль? <Link to="/login">Войти</Link></div>
    </div>
  );
}

export default ResetPasswordPage