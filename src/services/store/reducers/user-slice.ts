import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../../types/user";
import { deleteCookie, setCookie } from "../../cookie/cookie";

type initialStateType = {
    user: TUser | null;
    isLoading: boolean;
    isError: boolean;
    message: string;
    accessToken: string | null;
}

export const initialState:initialStateType = {
    user: null,
    isLoading: false,
    isError: false,
    message: '',
    accessToken: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        //ORDER API
        login(state, action: PayloadAction<any>){
            state.user = action.payload.user
            const accessToken = action.payload.accessToken.split('Bearer ')[1]
            state.accessToken = accessToken
            setCookie('token', action.payload.refreshToken)
            state.isLoading = false
            state.isError = false
        },
        logout(state){
            state.user = null
            state.accessToken = null
            deleteCookie('token')
            state.isLoading = false
            state.isError = false
        },
        register(state, action: PayloadAction<any>){
            state.user = action.payload.user
            const accessToken = action.payload.accessToken.split('Bearer ')[1]
            state.accessToken = accessToken
            setCookie('token', action.payload.refreshToken)
            state.isLoading = false
            state.isError = false
        },
        setUser(state, action: PayloadAction<any>){
            state.user = action.payload.user
            state.isLoading = false
            state.isError = false
        },
        refreshToken(state, action: PayloadAction<any>){
            const accessToken = action.payload.accessToken.split('Bearer ')[1]
            state.accessToken = accessToken
            setCookie('token', action.payload.refreshToken)
            state.isLoading = false
            state.isError = false
        },
        forgotPassword(state){
            state.isLoading = false
            state.isError = false
        },
        resetPassword(state){
            state.message = 'Пароль изменен'
            state.isLoading = false
            state.isError = false
        },
        fetching(state){
            state.isLoading = true
            state.isError = false
            state.message = ''
        },
        fetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.message = action.payload
            state.isError = true
        },
        clearMessage(state){
            state.message = ''
            state.isError = false
        }
    }
})

export const { 
    clearMessage,
    login,
    logout,
    register,
    setUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    fetching,
    fetchingError,
} = userSlice.actions

export default userSlice.reducer;