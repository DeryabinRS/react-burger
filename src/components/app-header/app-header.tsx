import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import styles from './app-header.module.css'

const AppHeader = () => {
    return (
        <header className={`${styles.header} p-4`}>
            <div className={styles.wrapper}>
                <div className={styles.links}>
                    <NavLink to="/" className={`${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}><BurgerIcon type="primary" /> <span className='ml-2'>Конструктор</span></NavLink>
                    <NavLink to="/" className={`${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}><ListIcon type="primary" /> <span className='ml-2'>Лента заказов</span></NavLink>
                </div>
                <div className='mr-25'>
                    <Logo />
                </div>
                <div className={styles.links}>
                    <NavLink to="/profile" className={`${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}>
                        <ProfileIcon type="primary" /> <span className='ml-2'>Личный кабинет</span>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default AppHeader