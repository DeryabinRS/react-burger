import { FC, useState, useCallback, useMemo } from 'react'
import { DragSourceMonitor, useDrag } from 'react-dnd'
import { BurgerType } from '../../types/burger-types'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredients-card.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { currentIngredientAdd, currentIngredientRemove } from '../../services/store/reducers/ingredients-slice'
import { Link } from 'react-router-dom'

const IngredientsCard: FC<BurgerType> = (props): JSX.Element => {
    const [isActive, setIsActive] = useState(false)
    const dispatch = useAppDispatch();

    const handleToggleModal = useCallback((active: boolean) => {
        active ? dispatch(currentIngredientAdd(props)) : dispatch(currentIngredientRemove(null))
        setIsActive(active)
    },[])

    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient',
        item: {...props},
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.2 : 1;

    const {selectedIngredients, selectedBun} = useAppSelector(store => store.constructorSlice)

    const ingredients = selectedBun ? [...selectedIngredients, selectedBun] : [...selectedIngredients]

    const countIngredients: number = useMemo(() => ingredients.filter((item:BurgerType) => props._id === item._id).length, [ingredients.length])

    return (
        <Link to={`/ingredients/${props._id}`} state={{modal: props._id}}>
            { isActive &&
            <Modal title="Детали ингредиента" isActive={isActive} handleToggleModal={handleToggleModal} >
                <IngredientDetails />
            </Modal>
            }
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
        </Link>
    )
}

export default IngredientsCard
