import { AppDispatch } from '../index'
import { ingredientsSlice } from '../reducers/ingredients-slice'

const API = 'https://norma.nomoreparties.space/api'

export const fetchIngredients = () => async(dispatch:AppDispatch) => {
    const apiIngredients:string = `${API}/ingredients`
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