import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerType } from "../../../types/burger-types";

type initialStateType = {
    currentIngredient: BurgerType | null;
}

const initialState:initialStateType = {
    currentIngredient: null,
}

export const modalSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers:{
        currentIngredientAdd(state, action:PayloadAction<BurgerType>){
            state.currentIngredient = action.payload
        },
        currentIngredientRemove(state){
            state.currentIngredient = null
        },
    }
})

export const { 
    currentIngredientAdd, 
    currentIngredientRemove,
} = modalSlice.actions

export default modalSlice.reducer;