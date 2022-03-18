import React from 'react'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
    //const useState['primary']
    return (
        <header className={styles.header}>
            <a href="#">
                <BurgerIcon type="primary" /> Конструктор
            </a>
        </header>
    )
}

export default AppHeader