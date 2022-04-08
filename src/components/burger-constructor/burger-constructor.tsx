import { FC, useState, useReducer, useEffect } from 'react'
import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../order-details/order-details'

import Modal from '../modal/modal'

import { useAppSelector } from '../../hooks/redux'

const BurgerConstructor: FC = () => {

	const [isActive, setIsActive] = useState(false)
	const [order, setOrder] = useState(0)
	
	const {selectedIngredients} = useAppSelector(state => state.ingredientsSlice)

	const getBun = selectedIngredients.find((item) => item.type === 'bun')
	const initialStatePrice = 0;

	const reducerPrice = (state:any, action: any) => {
		switch(action.type){
			case 'PLUS':
				return state + action.payload;
			case 'MINUS':
				return state - action.payload;
			default: return state;	
		}
	}

	const [price, dispatchPrice ] = useReducer(reducerPrice, initialStatePrice);

	useEffect(() => {
		selectedIngredients.forEach(item => {
			dispatchPrice({type:'PLUS', payload: item.type === 'bun' ? item.price * 2: item.price})
		})
	},[selectedIngredients])

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

	return (

		<div className={`${styles.burger_constructor} mt-25`}>
			<div className='pl-8 pb-4'>
				{getBun &&
					<ConstructorElement
						type="top"
						isLocked={true}
						text={getBun.name}
						price={getBun.price}
						thumbnail={getBun.image_mobile}
					/>
				}
			</div>
			<div className={`${styles.wrapper} scroll pr-2`}>
				{
					selectedIngredients.filter(item => item.type !== 'bun').map((item, i) => (
							<div key={`${item._id}_${i}`} className={`${styles.element} pb-4`}>
								<div className='pr-2'>
									<DragIcon type="primary" />
								</div>
								<ConstructorElement
									text={item.name}
									price={item.price}
									thumbnail={item.image_mobile}
								/>
							</div>
						)
					)
				}
			</div>
			<div className='pl-8 pt-4'>
				{getBun &&
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={getBun.name}
						price={getBun.price}
						thumbnail={getBun.image_mobile}
					/>
				}
			</div>
			<div className={`${styles.bottom} pt-10 mr-4 pb-15`}>
				<div className={styles.price}>
					<div className='pr-2'>{price}</div>
					<div className='pr-10'>
						<CurrencyIcon type="primary" />
					</div>
				</div>
				<Button onClick={() => handleToggleModal(true)}>Оформить заказ</Button>
			</div>
			<Modal isActive={isActive} handleToggleModal={handleToggleModal}>
				<OrderDetails id={`${order}`} />
			</Modal>
		</div>

	)
}

export default BurgerConstructor