import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../../types/user";

type initialStateType = {
    user: TUser | null;
    isLoading: boolean;
    message: string;
    token: string | null
}

const initialState:initialStateType = {
    user: null,
    isLoading: false,
    message: 'string',
    token: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        //ORDER API
        login(state, action: PayloadAction<any>){
            state.user = action.payload
            state.isLoading = false
        },
        register(state, action: PayloadAction<any>){
            state.user = action.payload
            state.isLoading = false
        },
        logout(state){
            state.user = null
        },
        setToken(state, action: PayloadAction<any>){

        },
        fetching(state){
            state.isLoading = true
        },
        fetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.message = action.payload
        },
    }
})

export const { 
    
} = userSlice.actions

export default userSlice.reducer;