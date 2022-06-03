
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { useAppSelector } from "../../hooks/redux";
import { useGetOrdersQuery } from "../../services/store/reducers/ws-orders-slice";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TLocationState = {
  modal?: string | undefined;
};

const FeedPageId = () => {
	const { id } = useParams();
	const location = useLocation();
	const ls = location.state as TLocationState;

	const { data, isLoading, isError } = useGetOrdersQuery(
		`wss://norma.nomoreparties.space/orders/all`
	);
	const storeIngredients = useAppSelector(
		(store) => store.ingredientsSlice.ingredients
	);
	const order = data && data?.orders.find((item) => item._id === id);
	
	const orderIngredients = order && order.ingredients

	const currentDate:number = Number(new Date());
	const date = order ? new Date(order?.updatedAt) : new Date()
	let days:number = Math.round((currentDate - Number(date))/86400000);
	const textDateDays = days === 0 ? 'Сегодня' : `${days} дней назад`

	let statusOrderText = "";
	if (order?.status) {
			switch (order.status) {
			case "done":
				statusOrderText = "Выполнен";
				break;
			case "pending":
				statusOrderText = "Готовиться";
				break;
			case "created":
				statusOrderText = "Создан";
				break;
			}
	}

	const uniqIngredients = orderIngredients ? 
		orderIngredients.reduce(function(prev:any, cur) {
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
				<div key={key} className="ingredients grid_order mt-1">
					<div className="image"><img src={ingredient.image_mobile} alt={ingredient.name}/></div>
					<div>
						{ingredient.name}
					</div>
					<div>{uniqIngredients[key]} x {price}</div>
					<div className="pr-3"><CurrencyIcon type="primary" /></div>
				</div>
			)
		}
	});

	if(isLoading) return <Loader/>
	
	return (
		<div className={`${!ls ? 'order_card mt-20' : 'order_card_modal'}`}>
			<div className={`${!ls && 'text-center'}`}>#{order && order.number}</div>
			<div className="mt-8">{order && order.name}</div>
			<div className="mt-4">{statusOrderText}</div>
			<div className="mt-10">Состав:</div>
			<div className="mt-2 scroll scroll_wrapper_modal">
				{IngredientsList}
			</div>
			
			<div className="mt-8 order_footer">
				<div className="text_color_inactive">{textDateDays}{` ${date.getHours()}:${date.getMinutes()} GTM${date.getTimezoneOffset()}`}</div>
				<div>{totalPrice}</div>
				<div><CurrencyIcon type="primary" /></div>
			</div>
		</div>
	);
};

export default FeedPageId;
