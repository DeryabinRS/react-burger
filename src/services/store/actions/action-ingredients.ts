import { AppDispatch } from '../index'
import { ingredientsSlice } from '../reducers/ingredients-slice'

export const fetchIngredients = () => async(dispatch:AppDispatch) => {
    const apiIngredients:string = 'https://norma.nomoreparties.space/api/ingredients'
    try {
        dispatch(ingredientsSlice.actions.ingredientsFetching())
        const response: any = await fetch(apiIngredients)
        if (!response.ok) {
            throw new Error('Ответ сети не был ok');
        }
        const res = await response.json();
        dispatch(ingredientsSlice.actions.ingredientsFetchingSuccess([...res.data]))
    } catch (error:any) {
        dispatch(ingredientsSlice.actions.ingredientsFetchingError(`Возникла проблема с вашим fetch запросом: ${error.message}`))
    }
}