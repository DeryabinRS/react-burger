import { AppDispatch } from '../index'
import { orderSlice } from '../reducers/order-slice'
import { BurgerType } from '../../../types/burger-types'

const API = process.env.REACT_APP_API


export const fetchOdrer = (ingredients:BurgerType[], accessToken:string | null) => async(dispatch:AppDispatch) => {
    const apiOrder = `${API}/orders`
		try {
            dispatch(orderSlice.actions.fetching())
			const response: Response = await fetch(apiOrder,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: "Bearer " + accessToken
				},
				body: JSON.stringify({ingredients})
			})
			if(!response.ok){
				throw Error('Ошибка запроса')
			}
			const res = await response.json()
			console.log(res)
			dispatch(orderSlice.actions.setOrder(res.order.number))
		} catch (error:any) {
			dispatch(orderSlice.actions.fetchingError(`Возникла проблема с вашим fetch запросом: ${error.message}`))
		}
}