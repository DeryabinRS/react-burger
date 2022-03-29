import React, { FC } from 'react'
import styles from './order-details.module.css'
import ImageDone from '../../img/done.svg'

interface OrderDetailsType{
    id: string; 
}

const OrderDetails:FC<OrderDetailsType> = ({id}) => {
  return (
    <div className={`${styles.card} mb-10`}>
        <div className={styles.number}>{id}</div>
        <div className={styles.title}>идентификатор заказа</div>
        <div className='mt-15 mb-15'><img src={ImageDone}/></div>
        <div className={styles.text_1}>Ваш заказ начали готовить</div>
        <div className={`${styles.text_2} pt-2`}>Дождитесь готовности на орбитальной станции</div>
    </div>
  )
}

export default OrderDetails 