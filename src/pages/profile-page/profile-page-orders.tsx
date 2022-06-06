import { FC } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader";
import OrderCard from "../../components/order-card/order-card";
import { useAppSelector } from "../../hooks/redux";
import { useGetOrdersQuery }  from "../../services/store/reducers/ws-orders-slice";

const ProfilePageOrders:FC = () => {
	const accessToken = useAppSelector(store => store.userSlice.accessToken) || ' '
	const { data, isLoading, isError } = useGetOrdersQuery(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);

	const arrayOrdersReverse = data && [...data?.orders].reverse()

	if(isLoading) return <Loader/>

  	return <div className="scroll scroll_wrapper pr-2">
		{arrayOrdersReverse?.map(order => {
			return (
			<Link to={`/profile/orders/${order._id}`} key={order._id} state={{modal: order._id}}>
				<OrderCard number={order.number} name={order.name} ingredients={order.ingredients} date={new Date(order.updatedAt)} status={order.status}/>
			</Link>
		)})}
	</div>;
};

export default ProfilePageOrders;
