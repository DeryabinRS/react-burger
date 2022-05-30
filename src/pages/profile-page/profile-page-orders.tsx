import { FC } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../../components/order-card/order-card";

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
  {
    id: 4,
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
  {
    id: 5,
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
  {
    id: 6,
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
  {
    id: 7,
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
  	return <div className="scroll scroll_wrapper pr-2">
		{orders.map(order => (
			<Link to={`/profile/orders/${order.id}`} key={order.id} state={{modal: order.id}}>
				<OrderCard num={order.number} name={order.name} ingredients={order.ingredients} date={new Date()} status={order.status} total={order.total}/>
			</Link>
		))}
	</div>;
};

export default ProfilePageOrders;
