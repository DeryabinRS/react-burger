import { FC } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../../components/order-card/order-card";
import { useAppSelector } from "../../hooks/redux";
import { getCookie } from "../../services/cookie/cookie";
import { useGetOrdersQuery }  from "../../services/store/reducers/ws-orders-slice";
import { IOrder } from "../../types/orders-types";

const orders = [
  {
    id: 1,
    number: "034535",
    name: "Альфа-сахаридный экзо-плантаго флюоресцентный фалленианский бургер",
    ingredients: [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733d2",
      "60d3b41abdacab0026a733d3",
    ],
    date: '',
    status: '',
    total: 0,
  },
  {
    id: 2,
    number: "034231",
    name: "Альфа-сахаридный экзо-плантаго флюоресцентный фалленианский бургер",
    ingredients: [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733d2",
      "60d3b41abdacab0026a733d3",
    ],
    date: '',
    status: '',
    total: 0,
  },
  {
    id: 3,
    number: "034432",
    name: "Альфа-сахаридный экзо-плантаго флюоресцентный фалленианский бургер",
    ingredients: [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733d0",
      "60d3b41abdacab0026a733d2",
      "60d3b41abdacab0026a733d3",
    ],
    date: '',
    status: '',
    total: 0,
  },
];

const ProfilePageOrders:FC = () => {
	const accessToken = useAppSelector(store => store.userSlice.accessToken) || ' '
	console.log(accessToken);
	const { data, isLoading, isError } = useGetOrdersQuery(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
	console.log(data);
	const arrayOrdersReverse = data && [...data?.orders].reverse()
  	return <div className="scroll scroll_wrapper pr-2">
		{arrayOrdersReverse?.map(order => {
			return (
			<Link to={`/profile/orders/${order._id}`} key={order._id} state={{modal: order._id}}>
				<OrderCard number={order.number} name={order.name} ingredients={order.ingredients} date={new Date()} status={order.status}/>
			</Link>
		)})}
	</div>;
};

export default ProfilePageOrders;
