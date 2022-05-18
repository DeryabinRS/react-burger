import { FC } from "react";
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
  },
];

const ProfilePageOrders:FC = () => {
  	return <div className="scroll pr-2">
		  {orders.map(order => (
			  <OrderCard key={order.id} />
		  ))}
	</div>;
};

export default ProfilePageOrders;
