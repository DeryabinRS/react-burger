import { FC, useContext, useState } from 'react'
import { BurgerType } from '../../types/Burger'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-card.module.css'
import { SelectedIngredientsContex } from '../../services/ingredientsService'

const IngredientsCard: FC<BurgerType> = (props): JSX.Element => {
    const [isActive, setIsActive] = useState(false)
    const handleToggleModal = (active: boolean) => {
        setIsActive(active)
    }

    const { selectedIngredients, dispatchIngredientsSelected } = useContext(SelectedIngredientsContex)

    return (
        <>
            <Modal title="Детали ингредиента" isActive={isActive} handleToggleModal={handleToggleModal} >
                <IngredientDetails
                    image={props.image_large}
                    name={props.name}
                    proteins={props.proteins}
                    fat={props.fat}
                    carbohydrates={props.carbohydrates}
                    calories={props.calories}
                />
            </Modal>
            <div className={`${styles.card} pt-6 mr-4 ml-4`}>
                <div className={styles.counter}><Counter count={1} size="default" /></div>
                <div onClick={() => handleToggleModal(true)} className={styles.image}>
                    <img src={props.image_large} alt={props.name} />
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

export default IngredientsCard
