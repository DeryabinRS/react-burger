import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerType } from "../../../types/Burger";

type initialStateType = {
    ingredients: BurgerType[];
    selectedIngredients: BurgerType[];
    isLoading: boolean;
    error: string;
}

const initialState:initialStateType = {
    ingredients: [],
    selectedIngredients: [],
    isLoading: false,
    error: '',
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers:{
        ingredientsFetching(state){
            state.isLoading = true;
        },
        ingredientsFetchingSuccess(state, action: PayloadAction<BurgerType[]>){
            state.isLoading = false
            state.error = ''
            state.ingredients = action.payload;
        },
        ingredientsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        }
    }
})

export default ingredientsSlice.reducer;