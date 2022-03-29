import React, { FC, useState, useCallback } from 'react'
import styles from './burger-ingredients.module.css'
import { BurgerType, BurgerListType } from '../../types/Burger'
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details'
import ModalCustom from '../modal-custom/modal-custom'

const CardIngredient: FC<BurgerType> = (props): JSX.Element => {
    const [isActive, setIsActive] = useState(false)
    const handleToggleModal = () => {
        setIsActive(!isActive)
    }
    const escFunction = useCallback((event: any) => {
        if (event.key === "Escape") {
            setIsActive(false)
        }
    }, []);

    return (
        <>
            <ModalCustom title="Детали ингредиента" isActive={isActive} handleCloseModal={handleToggleModal} escFunction={escFunction}>
                <IngredientDetails
                    image={props.image_large}
                    name={props.name}
                    proteins={props.proteins}
                    fat={props.fat}
                    carbohydrates={props.carbohydrates}
                    calories={props.calories}
                />
            </ModalCustom>
            <div className={`${styles.card} pt-6 mr-4 ml-4`}>
                <div className={styles.counter}><Counter count={1} size="default" /></div>
                <div onClick={handleToggleModal} className={styles.image}>
                    <img src={props.image_large} />
                </div>
                <div className={styles.price}>
                    <div className='pr-1'>{props.price}</div> <CurrencyIcon type="primary" />
                </div>
                <div className={styles.name}>
                    {props.name}
                </div>
            </div>
        </>
    )
}

const BurgerIngredients: FC<BurgerListType> = ({ burgerList }): JSX.Element => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={styles.wrapper}>
            <div><h2 className={`${styles.h2} mt-10 mb-5`}>Собери бургер</h2></div>
            <div className={styles.flex}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.wrapper_indredients} mt-10 scroll`}>
                <h2 className={styles.title}>Булки</h2>
                <div className={`${styles.ingredient_list} mb-10`}>
                    {burgerList.filter(item => item.type === 'bun').map(item => <CardIngredient key={item._id} {...item} />)}
                </div>
                <h2 className={styles.title}>Соусы</h2>
                <div className={`${styles.ingredient_list} mb-10`}>
                    {burgerList.filter(item => item.type === 'sauce').map(item => <CardIngredient key={item._id} {...item} />)}
                </div>
                <h2 className={styles.title}>Начинки</h2>
                <div className={`${styles.ingredient_list} mb-10`}>
                    {burgerList.filter(item => item.type === 'main').map(item => <CardIngredient key={item._id} {...item} />)}
                </div>
            </div>
        </div>
    )
}



export default BurgerIngredients