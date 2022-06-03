import React from 'react'
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import OrderCard from '../../components/order-card/order-card';
import { useGetOrdersQuery } from '../../services/store/reducers/ws-orders-slice';

const FeedPage = () => {
	const { data, isLoading, isError } = useGetOrdersQuery(`wss://norma.nomoreparties.space/orders/all`);
	const arrayOrders = data ? [...data?.orders] : []

	const ordersDone = arrayOrders.filter(order => order.status === 'done')
	const ordersPending = arrayOrders.filter(order => order.status === 'pending')

	if(isLoading) return <Loader/>

  	return (
		<>
		<h1>Лента заказов</h1>
		<div className='page_feed'>
			<div className="scroll scroll_wrapper pr-2">
				{arrayOrders?.map(order => (
					<Link to={`/feed/${order._id}`} key={order._id} state={{modal: order._id}}>
						<OrderCard number={order.number} name={order.name} ingredients={order.ingredients} date={new Date(order.updatedAt)} status={order.status}/>
					</Link>
				))}
			</div>
			<div>
				<div className='orders_info'>
					<div>
						<h4>Готовы</h4>
						{ordersDone.map(item => <p key={item._id} className='font_iceland text_color_1'>{item.number}</p>).slice(0,5)}
					</div>
					<div>
						<h4>В работе</h4>
						{ordersPending.map(item => <p key={item._id} className='font_iceland'>{item.number}</p>).slice(0,5)}
					</div>
				</div>
				<div className='mt-6'>
					<div>
						Выполнено за всё время:
						<p className='total_count font_iceland'>{data?.total}</p>
					</div>
					<div className='mt-8'>
						Выполнено за всё время:
						<p className='total_count font_iceland'>{data?.totalToday}</p>
					</div>
				</div>	
			</div>
		</div>
		</>
	  )
}

export default FeedPage