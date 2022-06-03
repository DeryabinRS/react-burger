import { AppDispatch } from '../index'
import { ingredientsSlice } from '../reducers/ingredients-slice'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../index'

const API = process.env.REACT_APP_API

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export const fetchIngredients: AppThunk | any = () => async(dispatch:AppDispatch) => {
    const apiIngredients:string = `${API}/ingredients`
    try {
        dispatch(ingredientsSlice.actions.fetching())
        const response: Response = await fetch(apiIngredients)
        if (!response.ok) {
            throw new Error('Ответ сети не был ok');
        }
        const res = await response.json();
        dispatch(ingredientsSlice.actions.setIngredients([...res.data]))
    } catch (error:any) {
        dispatch(ingredientsSlice.actions.fetchingError(`Возникла проблема с вашим fetch запросом: ${error.message}`))
    }
}