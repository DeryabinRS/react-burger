import { TUser } from '../../../types/user'
import { AppDispatch } from '../index'
import { userSlice } from '../reducers/user-slice'

const API:string = 'https://norma.nomoreparties.space/api/auth'

type TRegUser = {
    success: boolean,
    user: TUser,
    accessToken: string,
    refreshToken: string
} 

export const fetchRegister = (email:string, password:string, name:string) => async(dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetching())
        const response: any = await fetch(`${API}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        })
        console.log(response)
        if (!response.ok) {
            if(response.status === 403){
                throw new Error('Такой пользователь уже существует.');
            }
            if(response.status === 404){
                throw new Error('Ошибка запроса регистрации.');
            }
        }
        const res = await response.json();
        console.log(res)
        dispatch(userSlice.actions.register(res))
    } catch (error:any) {
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
}