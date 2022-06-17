import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    numOrder:string;
    isLoading: boolean;
    error: string;
}

export const initialState:initialStateType = {
    numOrder: '0000',
    isLoading: false,
    error: '',
}

export const orderSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers:{
        //ORDER API
        setOrder(state, action){
            state.numOrder = action.payload
        },
        fetching(state){
            state.isLoading = true
        },
        fetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const { 
    setOrder,
    fetching,
    fetchingError,
} = orderSlice.actions

export default orderSlice.reducer;