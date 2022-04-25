import { AppDispatch } from '../index'
import { userSlice } from '../reducers/user-slice'
import { getCookie } from '../../cookie/cookie'
const API:string = 'https://norma.nomoreparties.space/api/auth'

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
        dispatch(userSlice.actions.register(res))
    } catch (error:any) {
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
}

export const fetchLogin = (email:string, password:string) => async(dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetching())
        const response: any = await fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        if (!response.ok) {
            if(response.status === 401){
                throw new Error('Не верный логин или пароль');
            }
            if(response.status === 404){
                throw new Error('Ошибка запроса регистрации.');
            }
        }
        const res = await response.json();
        dispatch(userSlice.actions.login(res))
    } catch (error:any) {
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
}

export const getUserRequest = (accessToken: string) => async(dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetching())
        const response = await fetch(`${API}/user`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
        if (!response.ok) {
            throw new Error('Ошибка авторизации');
        }
        const res = await response.json();
        dispatch(userSlice.actions.setUser(res))
    } catch (error:any) {
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
}
  
export const refreshToken = (token: string) => async(dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetching())
        const response = await fetch(`${API}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        if (!response.ok) {
            throw new Error('Ошибка обновления токена');
        }
        const res = await response.json();
        dispatch(userSlice.actions.refreshToken(res))
    } catch (error:any) {
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
}
  
export const logoutRequest = () => async(dispatch:AppDispatch) => {
    const token = getCookie('token')
    try {
        dispatch(userSlice.actions.fetching())
        const response = await fetch(`${API}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
        if (!response.ok) {
            throw new Error('Ошибка выхода из фккаунта');
        }    
        dispatch(userSlice.actions.logout())
    }catch(error:any){
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
    
};