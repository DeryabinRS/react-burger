import { FC, useContext, useEffect, useState } from 'react'
import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png'
import OrderDetails from '../order-details/order-details'

import Modal from '../modal/modal'
import { IngredientsDataContex, SelectedIngredientsContex } from '../../services/ingredientsService'
import { BurgerType } from '../../types/Burger'

const BurgerConstructor: FC = () => {

	const [isActive, setIsActive] = useState(false)
	const handleToggleModal = (active:boolean) => {
		setIsActive(active)
	}

	const {ingredients} = useContext(IngredientsDataContex)
	const { selectedIngredients, dispatchIngredientsSelected } = useContext(SelectedIngredientsContex)

	return (

		<div className={`${styles.burger_constructor} mt-25`}>
			<div className='pl-8 pb-4'>
				<ConstructorElement
					type="top"
					isLocked={true}
					text="Краторная булка N-200i (верх)"
					price={200}
					thumbnail={img}
				/>
			</div>
			<div className={`${styles.wrapper} scroll pr-2`}>
				{
					ingredients.filter((item) => item.type !== 'bun' && selectedIngredients.includes(item._id)).map((item:BurgerType) => (
						<div key={item._id} className={`${styles.element} pb-4`}>
							<div className='pr-2'>
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</div>
					))
				}
			</div>
			<div className='pl-8 pt-4'>
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text="Краторная булка N-200i (низ)"
					price={200}
					thumbnail={img}
				/>
			</div>
			<div className={`${styles.bottom} pt-10 mr-4 pb-15`}>
				<div className={styles.price}>
					<div className='pr-2'>610</div>
					<div className='pr-10'>
						<CurrencyIcon type="primary" />
					</div>
				</div>
				<Button onClick={() => handleToggleModal(true)}>Оформить заказ</Button>
			</div>
			<Modal isActive={isActive} handleToggleModal={handleToggleModal}>
				<OrderDetails id={'034536'} />
			</Modal>
		</div>

	)
}

export default BurgerConstructor