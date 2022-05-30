import { FC } from 'react'
import { useAppSelector } from '../../hooks/redux';
import styles from './order-card.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

interface IOrderCard {
  num: string,
  name: string,
  ingredients: string[],
  date: Date,
  status: string,
  total: number,
}

const OrderCard:FC<IOrderCard> = ({num, name, ingredients, date, status, total}) => {
	const currentDate:number = Number(new Date());
	const storeIngredients = useAppSelector(store => store.ingredientsSlice.ingredients)
	let days:number = Math.floor((currentDate - Number(date))/86400000); 
	
	const textDateDays = days === 0 ? 'Сегодня' : `${days} дней назад`
	return (
		<div className={`${styles.order_card} p-6 mb-6`}>
			<div className={styles.header_card}>
				<div>#{num}</div>
				<div>{textDateDays}{` ${date.getHours()}:${date.getMinutes()} GTM${date.getTimezoneOffset()}`}</div>
			</div>
			<div className='mt-6'>{name}</div>
			<div className='mt-6'>{status}</div>
			<div className={`${styles.order_footer} mt-6`}>
				<div className={`${styles.ingredients}`}>
					{ingredients.map((item, i) => {
						const ingredient = storeIngredients.find(i => i._id === item)
						if(ingredient) {
							return (
								<div key={i}><img src={ingredient.image_mobile} alt={ingredient.name}/></div>
							)
						}
					})}
				</div>
				<div className={styles.total}>{total} <CurrencyIcon type="primary" /></div>
			</div>
		</div>
	)
}

export default OrderCard