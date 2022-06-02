import { FC } from 'react'
import { useAppSelector } from '../../hooks/redux';
import styles from './order-card.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

interface IOrderCard {
	number: number,
	name: string,
	ingredients: string[],
	date: Date,
	status?: string,
}

const OrderCard:FC<IOrderCard> = ({number, name, ingredients, date, status}) => {
	const currentDate:number = Number(new Date());
	const storeIngredients = useAppSelector(store => store.ingredientsSlice.ingredients)
	let days:number = Math.round((currentDate - Number(date))/86400000); 
	
	const textDateDays = days === 0 ? 'Сегодня' : `${days} дней назад`
	let price = 0;
	let statusOrderText = ''
	switch(status){
		case('done'): statusOrderText = 'Выполнен'; break;
		case('pending'): statusOrderText = 'Готовиться'; break;
		case('created'): statusOrderText = 'Создан'; break;
	}
	return (
		<div className={`${styles.order_card} p-6 mb-6`}>
			<div className={styles.header_card}>
				<div>#{number}</div>
				<div>{textDateDays}{` ${date.getHours()}:${date.getMinutes()} GTM${date.getTimezoneOffset()}`}</div>
			</div>
			<div className='mt-6'>{name}</div>
			<div className={`mt-6 ${status === 'done' && styles.done}`}>{statusOrderText}</div>
			<div className={`${styles.order_footer} mt-6 scroll`}>
				<div className={`${styles.ingredient}`}>
					{ingredients.map((item, i) => {
						const ingredient = storeIngredients.find(i => i._id === item)
						price += ingredient?.price || 0
						if(ingredient) {
							return (
								<div key={i} className="ingredients">
									<div className='image'>
										<img src={ingredient.image_mobile} alt={ingredient.name}/></div>
									</div>
									
							)
						}
					})}
				</div>
				<div className={styles.total}>{price} <CurrencyIcon type="primary" /></div>
			</div>
		</div>
	)
}

export default OrderCard