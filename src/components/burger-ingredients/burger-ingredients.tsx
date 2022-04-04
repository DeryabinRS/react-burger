import React, { FC, useContext } from 'react'
import styles from './burger-ingredients.module.css'
import IngredientsCard from '../ingredients-card/ingredients-card'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsDataContex } from '../../services/ingredientsService'

const BurgerIngredients: FC = (): JSX.Element => {
    const [current, setCurrent] = React.useState('one')

    const { ingredients } = useContext(IngredientsDataContex)

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
                    {ingredients.filter(item => item.type === 'bun').map(item => <IngredientsCard key={item._id} {...item} />)}
                </div>
                <h2 className={styles.title}>Соусы</h2>
                <div className={`${styles.ingredient_list} mb-10`}>
                    {ingredients.filter(item => item.type === 'sauce').map(item => <IngredientsCard key={item._id} {...item} />)}
                </div>
                <h2 className={styles.title}>Начинки</h2>
                <div className={`${styles.ingredient_list} mb-10`}>
                    {ingredients.filter(item => item.type === 'main').map(item => <IngredientsCard key={item._id} {...item} />)}
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients
