import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerType } from "../../../types/burger-types";

type initialStateType = {
    ingredients: BurgerType[];
    isLoading: boolean;
    error: string;
    currentIngredient: BurgerType | null;
}

export const initialState:initialStateType = {
    ingredients: [],
    isLoading: false,
    error: '',
    currentIngredient: null,
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers:{
        fetching(state){
            state.isLoading = true
        },
        fetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
        
        //INGREDIENTS API
        setIngredients(state, action: PayloadAction<BurgerType[]>){
            console.log(action.payload)
            state.isLoading = false
            state.error = ''
            state.ingredients = action.payload
        },
        currentIngredientAdd(state, action:PayloadAction<BurgerType>){
            state.currentIngredient = action.payload
        },
        currentIngredientRemove(state, action:PayloadAction<null>){
            state.currentIngredient = null
        },
    }
})

export const { 
    setIngredients,
    currentIngredientAdd, 
    currentIngredientRemove, 
    fetching,
    fetchingError,
} = ingredientsSlice.actions

export default ingredientsSlice.reducer;