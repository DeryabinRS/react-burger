import { AppDispatch } from '../index'
import { ingredientsSlice } from '../reducers/ingredients-slice'

export const fetchIngredients = () => async(dispatch:AppDispatch) => {
    const apiIngredients:string = 'https://norma.nomoreparties.space/api/ingredients'
    try {
        dispatch(ingredientsSlice.actions.fetching())
        const response: any = await fetch(apiIngredients)
        if (!response.ok) {
            throw new Error('Ответ сети не был ok');
        }
        const res = await response.json();
        dispatch(ingredientsSlice.actions.setIngredients([...res.data]))
    } catch (error:any) {
        dispatch(ingredientsSlice.actions.fetchingError(`Возникла проблема с вашим fetch запросом: ${error.message}`))
    }
}

export const fetchOdrer = (ingredients:any[]) => async(dispatch:AppDispatch) => {
    const apiOrder = 'https://norma.nomoreparties.space/api/orders'
		try {
            dispatch(ingredientsSlice.actions.fetching())
			const response = await fetch(apiOrder,{
				method: 'POST',
				headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({ingredients})
			})
			if(!response.ok){
				throw Error('Ошибка запроса')
			}
			const res = await response.json()
			dispatch(ingredientsSlice.actions.setOrder(res.order.number))
		} catch (error:any) {
			dispatch(ingredientsSlice.actions.fetchingError(`Возникла проблема с вашим fetch запросом: ${error.message}`))
		}
}