import { FC, useState, ChangeEvent } from 'react'
import { useAppSelector } from '../../hooks/redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'

const ProfilePageData:FC = () => {
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
    return (
        <form>
            <div><Input icon={'EditIcon'} onChange={onChangeName} value={name} name={'name'} placeholder='Имя'/></div>
            <div className='mt-6'><Input icon={'EditIcon'} onChange={onChangeEmail} value={email} type={'email'} name={'email'} placeholder='Логин'/></div>
            <div className='mt-6'><Input icon={'EditIcon'} onChange={onChangePassword} value={password} type={'password'} name={'password'} placeholder='Пароль'/></div>
        </form>
    )
}

export default ProfilePageData