import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerType } from "../../../types/burger-types";

type initialStateType = {
    ingredients: BurgerType[];
    selectedIngredients: BurgerType[];
    selectedBun: BurgerType | null,
    isLoading: boolean;
    error: string;
    statePrice: number;
    currentIngredient: BurgerType | null;
    numOrder:string;
}

const initialState:initialStateType = {
    ingredients: [],
    selectedIngredients: [],
    selectedBun: null,
    isLoading: false,
    error: '',
    statePrice: 0,
    currentIngredient: null,
    numOrder: '0000',
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers:{
        ingredientsFetching(state){
            state.isLoading = true
        },
        ingredientsFetchingSuccess(state, action: PayloadAction<BurgerType[]>){
            state.isLoading = false
            state.error = ''
            state.ingredients = action.payload
        },
        ingredientsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
        selectedIngredientsAdd(state, action: PayloadAction<BurgerType>){
            if(action.payload.type === 'bun'){
                state.selectedBun = action.payload
            }else{
                state.selectedIngredients = [...state.selectedIngredients, {...action.payload, dragId: uuidv4()}]
            }
            const priceBun = state.selectedBun?.price || 0
            state.statePrice = state.selectedIngredients.reduce((prev, item) => prev += item.price, 0) + priceBun
        },
        selectedIngredientsUpdate(state, action: PayloadAction<BurgerType[]>){
            state.selectedIngredients = action.payload
        },
        selectedIngredientDelete(state, action: PayloadAction<string>){
            state.selectedIngredients = state.selectedIngredients.filter(item => item.dragId !== action.payload)
        },
        currentIngredientAdd(state, action:PayloadAction<BurgerType>){
            state.currentIngredient = action.payload
        },
        currentIngredientRemove(state, action:PayloadAction<null>){
            state.currentIngredient = action.payload
        },
        getOrderNumber(state, action){
            state.numOrder = action.payload
        },
    }
})

export const { 
    selectedIngredientsAdd, 
    currentIngredientAdd, 
    currentIngredientRemove, 
    selectedIngredientsUpdate, 
    selectedIngredientDelete 
} = ingredientsSlice.actions

export default ingredientsSlice.reducer;