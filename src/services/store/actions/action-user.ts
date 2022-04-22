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
            throw new Error('Ошибка авторизации');
        }
        const res = await response.json();
        console.log(res)
        //dispatch(userSlice.actions.register([...res.data]))
    } catch (error:any) {
        dispatch(userSlice.actions.fetchingError(`Возникла проблема с вашим fetch запросом: ${error.message}`))
    }
}