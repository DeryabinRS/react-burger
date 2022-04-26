import { AppDispatch } from '../index'
import { orderSlice } from '../reducers/order-slice'

const API = 'https://norma.nomoreparties.space/api'

export const fetchOdrer = (ingredients:any[]) => async(dispatch:AppDispatch) => {
    const apiOrder = `${API}/orders`
		try {
            dispatch(orderSlice.actions.fetching())
			const response = await fetch(apiOrder,{
				method: 'POST',
				headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({ingredients})
			})
			if(!response.ok){
				throw Error('Ошибка запроса')
			}
			const res = await response.json()
			dispatch(orderSlice.actions.setOrder(res.order.number))
		} catch (error:any) {
			dispatch(orderSlice.actions.fetchingError(`Возникла проблема с вашим fetch запросом: ${error.message}`))
		}
}