import { AnyAction, Dispatch } from 'redux'
import { AppDispatch, AppStore } from '../index'
import { userSlice } from '../reducers/user-slice'
import { getCookie } from '../../cookie/cookie'
import { ThunkAction } from 'redux-thunk'

const API = process.env.REACT_APP_API

export const fetchRegister = 
(email:string, password:string, name:string) => async(dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetching())
        const response: Response = await fetch(`${API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        })
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
        const response: Response = await fetch(`${API}/auth/login`, {
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
        const response: Response = await fetch(`${API}/auth/user`, {
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
        const response: Response = await fetch(`${API}/auth/token`, {
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
        const response: Response = await fetch(`${API}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
        if (!response.ok) {
            throw new Error('Ошибка выхода из аккаунта');
        }    
        dispatch(userSlice.actions.logout())
    }catch(error:any){
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
    
};

export const forgotPassword = (email: string) => async(dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetching())
        const response: Response = await fetch(`${API}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        if (!response.ok) {
            if(response.status === 404){
                throw new Error('Пользователь с таким email не существует.');
            }
        }
        const res = await response.json();
        dispatch(userSlice.actions.forgotPassword())
        return res.success;
    } catch (error:any) {
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
}

export const resetPassword = (password:string, token: string) => async(dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.fetching())
        const response: Response = await fetch(`${API}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password, token})
        });
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }
        const res = await response.json();
        dispatch(userSlice.actions.resetPassword())
        return res.success;
    } catch (error:any) {
        dispatch(userSlice.actions.fetchingError(`Внимание! ${error.message}`))
    }
}