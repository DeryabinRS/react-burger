import { FC, useCallback, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../order-details/order-details'

import Modal from '../modal/modal'

import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { setOrder } from '../../services/store/reducers/order-slice'
import { selectedIngredientsAdd, selectedIngredientsClear, selectedIngredientsUpdate } from '../../services/store/reducers/constructor-slice'
import BurgerIngredientCard from './burger-ingredient-card'
import { fetchOdrer } from '../../services/store/actions/action-order'
import { BurgerType } from '../../types/burger-types'
import PrivateRoute from '../private-route/private-route';

const BurgerConstructor: FC = () => {
	const dispatch = useAppDispatch()
	const [isActive, setIsActive] = useState<boolean>(false)
	
	const { selectedIngredients, selectedBun, statePrice } = useAppSelector(state => state.constructorSlice)
	const accessToken = useAppSelector(state => state.userSlice.accessToken)
	const { numOrder } = useAppSelector(state => state.orderSlice)

	const ingredients = selectedIngredients.filter(item => item.type !== 'bun')

	const [, dropRef] = useDrop(() => ({
        accept: "ingredient",
        drop(item:BurgerType) {
            dispatch(selectedIngredientsAdd({...item, dragId: uuidv4()}));
        },
    }));

	const handleToggleModal = (active:boolean) => {
		if(active){
			const ingredients = selectedIngredients.map((item: any) => item._id)
			const ingredientsWithBun = [...ingredients, selectedBun?._id]
			dispatch(fetchOdrer(ingredientsWithBun, accessToken))
			setIsActive(active)
		}else{
			dispatch(setOrder('000000'))
			dispatch(selectedIngredientsClear())
			setIsActive(active)
		}
	}

	 const moveCard = useCallback((dragIndex: number, hoverIndex: number): void => {
		const dragCard = ingredients[dragIndex];
		const newCards = [...ingredients]

	 	newCards.splice(dragIndex, 1)
	 	newCards.splice(hoverIndex, 0, dragCard)
	 	dispatch(selectedIngredientsUpdate(newCards))
	}, [ingredients, dispatch]);

	return (
		<div className={`${styles.burger_constructor} mt-25`} ref={dropRef}>
			<div className='pl-8 pb-2'>
				{selectedBun ?
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${selectedBun.name} (верх)`}
						price={selectedBun.price}
						thumbnail={selectedBun.image_mobile}
					/>
					: 
					<div className="p-10"></div>
				}
			</div>
			<div className={`${styles.wrapper} scroll pr-2 `}>
				{ selectedIngredients.length > 0 ?
					ingredients.map((item, i) => (
							<BurgerIngredientCard key={item.dragId} item={item} index={i} moveCard={moveCard}/>
						)
					)
				: <div className={`${styles.empty_constructor} pl-10 pr-10 pt-30 pb-30`}>Нет выбранных ингредиентов.<br/> Перетащите в данное поле ингредиенты для бургера</div>}
			</div>
			<div className='pl-8 pt-2'>
				{selectedBun ?
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${selectedBun.name} - (низ)`}
						price={selectedBun.price}
						thumbnail={selectedBun.image_mobile}
					/>
					:
					<div className="p-10"></div>
				}
			</div>
			<div className={`${styles.bottom} pt-10 mr-4 pb-15`}>
				<div className={styles.price}>
					<div className='pr-2'>{statePrice}</div>
					<div className='pr-10'>
						<CurrencyIcon type="primary" />
					</div>
				</div>
				<Button 
					onClick={() => handleToggleModal(true)} 
					disabled={selectedIngredients.length === 0 || !!!selectedBun}
				>Оформить заказ</Button>
			</div>
			{isActive &&
				<PrivateRoute>
					<Modal isActive={isActive} handleToggleModal={handleToggleModal}>
						<OrderDetails id={`${numOrder}`} />
					</Modal>
				</PrivateRoute>
			}
		</div>

	)
}

export default BurgerConstructor