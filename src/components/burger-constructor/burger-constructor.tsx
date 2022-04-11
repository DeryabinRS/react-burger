import { FC, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../order-details/order-details'

import Modal from '../modal/modal'

import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { selectedIngredientsAdd, selectedIngredientsUpdate } from '../../services/store/reducers/ingredients-slice'
import BurgerIngredientCard from './burger-ingredient-card'

const BurgerConstructor: FC = () => {
	const dispatch = useAppDispatch()
	const [isActive, setIsActive] = useState(false)
	const [order, setOrder] = useState(0)
	
	const {selectedIngredients, selectedBun, statePrice} = useAppSelector(state => state.ingredientsSlice)

	const ingredients = selectedIngredients.filter(item => item.type !== 'bun')

	const [, dropRef] = useDrop(() => ({
        accept: "ingredient",
        drop(item:any) {
            dispatch(selectedIngredientsAdd(item));
        },
    }));


	const createOrder = async (ingredients:{}) => {
		const API = 'https://norma.nomoreparties.space/api/orders'
		try {
			const response = await fetch(API,{
				method: 'POST',
				headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify(ingredients)
			})
			if(!response.ok){
				throw Error('Ошибка запроса')
			}
			const res = await response.json()
			setOrder(res.order.number)
		} catch (error) {
			console.log(error);
		}
	}

	const handleToggleModal = (active:boolean) => {
		setIsActive(active)
		const ingredients = {
			ingredients: selectedIngredients.map(item => item._id)
		}
		createOrder(ingredients);
	}

	 const moveCard = useCallback((dragIndex, hoverIndex) => {
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
						text={selectedBun.name}
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
						text={selectedBun.name}
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
			<Modal isActive={isActive} handleToggleModal={handleToggleModal}>
				<OrderDetails id={`${order}`} />
			</Modal>
		</div>

	)
}

export default BurgerConstructor