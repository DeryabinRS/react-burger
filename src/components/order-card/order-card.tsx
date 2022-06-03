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


	const uniqIngredients = ingredients ? 
	ingredients.reduce(function(prev:any, cur) {
		prev[cur] = (prev[cur] || 0) + 1;
		return prev;
	  }, {}) 
	: [];

	let totalPrice = 0;

	const IngredientsList = Object.keys(uniqIngredients).map(function(key) {
		let price = 0;
		const ingredient = storeIngredients.find(i => i._id === key)
		if(ingredient) {
			price = ingredient.price * uniqIngredients[key]
			totalPrice += price
			return (
				<div key={key} className="ingredients">
					<div className='image'>
						<img src={ingredient.image_mobile} alt={ingredient.name}/>
						<div className='count'>{uniqIngredients[key] > 1 && `+${uniqIngredients[key]}`}</div>
					</div>
				</div>
					
			)
		}
	});

	return (
		<div className={`${styles.order_card} p-6 mb-6`}>
			<div className={styles.header_card}>
				<div className='font_iceland'>#{number}</div>
				<div className='text_color_inactive'>{textDateDays}{` ${date.getHours()}:${date.getMinutes()} GTM${date.getTimezoneOffset()}`}</div>
			</div>
			<div className='mt-6'>{name}</div>
			<div className={`mt-6 ${status === 'done' && styles.done}`}>{statusOrderText}</div>
			<div className={`${styles.order_footer} mt-6 scroll`}>
				<div className={`${styles.ingredient}`}>
					{IngredientsList}
				</div>
				<div className={styles.total}><span>{totalPrice}</span> <CurrencyIcon type="primary" /></div>
			</div>
		</div>
	)
}

export default OrderCard