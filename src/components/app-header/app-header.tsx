import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import CustomLink from '../custom-link/custom-link'
import styles from './app-header.module.css'

const AppHeader = () => {
    return (
        <header className={`${styles.header} p-4`}>
            <div className={styles.wrapper}>
                <div className={styles.links}>
                    <CustomLink to="/" classes={`${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}><BurgerIcon type="primary" /> <span className='ml-2'>Конструктор</span></CustomLink>
                    <CustomLink to="/profile/orders" classes={`${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}><ListIcon type="primary" /> <span className='ml-2'>Лента заказов</span></CustomLink>
                </div>
                <div className='mr-25'>
                    <Logo />
                </div>
                <div className={styles.links}>
                    <CustomLink to="/profile" classes={`${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}>
                        <ProfileIcon type="primary" /> <span className='ml-2'>Личный кабинет</span>
                    </CustomLink>
                </div>
            </div>
        </header>
    )
}

export default AppHeader