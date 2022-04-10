import { FC, useContext, useState } from 'react'
import { useDrag } from 'react-dnd'
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

    const [{ isDragging }, dragRef]:any = useDrag({
        type: 'ingredient',
        item: {...props},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.2 : 1;

    const { selectedIngredients } = useContext(SelectedIngredientsContex)
    const countIngredients = selectedIngredients.filter(item => props._id === item._id).length
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
            <div className={`${styles.card} pt-6 mr-4 ml-4`} ref={dragRef} style={{opacity}}>
                <div className={styles.counter}>
                {!!countIngredients && 
                    <Counter count={countIngredients} size="default" />
                }
                </div>
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
