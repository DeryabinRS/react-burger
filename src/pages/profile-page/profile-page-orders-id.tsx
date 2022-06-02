
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { useAppSelector } from "../../hooks/redux";
import { useGetOrdersQuery } from "../../services/store/reducers/ws-orders-slice";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IOrder } from "../../types/orders-types";

type TLocationState = {
  modal?: string | undefined;
};

const ProfilePageOrdersId = () => {
	const { id } = useParams();
	const location = useLocation();
	const ls = location.state as TLocationState;

	const accessToken =
		useAppSelector((store) => store.userSlice.accessToken) || " ";
	const { data, isLoading, isError } = useGetOrdersQuery(
		`wss://norma.nomoreparties.space/orders?token=${accessToken}`
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
	console.log(orderIngredients);
	const count: Record<string,any> = {};

    orderIngredients && orderIngredients?.forEach(function(i:string) { 
		count[i as keyof typeof count] = (count[i as keyof typeof count] || 0) + 1; 
	});
    console.log(count);

	if(isLoading) return <Loader/>
	let price = 0;
	return (
		<div className={`${!ls ? 'order_card mt-20' : 'order_card_modal'}`}>
			<div className={`${!ls && 'text-center'}`}>#{order && order.number}</div>
			<div className="mt-8">{order && order.name}</div>
			<div className="mt-4">{statusOrderText}</div>
			<div className="mt-10">Состав:</div>
			<div className="mt-2 scroll scroll_wrapper_modal">
				{orderIngredients?.map((item, i) => {
					const ingredient = storeIngredients.find(i => i._id === item)
					if(ingredient) {
						price += ingredient.price
						return (
							<div key={i} className="ingredients grid_order mt-1">
								<div className="image"><img src={ingredient.image_mobile} alt={ingredient.name}/></div>
								<div>
									{ingredient.name}
								</div>
								<div>{ingredient.price}</div>
								<div className="pr-3"><CurrencyIcon type="primary" /></div>
							</div>
						)
					}
				})}
			</div>
			<div>
				{
					orderIngredients?.map((el:any, i, a) => ({
						[el]: a[el]
					}))
				}
			</div>
			<div className="mt-8 order_footer">
				<div className="text_color_inactive">{textDateDays}{` ${date.getHours()}:${date.getMinutes()} GTM${date.getTimezoneOffset()}`}</div>
				<div>{price}</div>
				<div><CurrencyIcon type="primary" /></div>
			</div>
		</div>
	);
};

export default ProfilePageOrdersId;
