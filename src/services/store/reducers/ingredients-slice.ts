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
        fetching(state){
            state.isLoading = true
        },
        fetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
        
        //INGREDIENTS API
        setIngredients(state, action: PayloadAction<BurgerType[]>){
            state.isLoading = false
            state.error = ''
            state.ingredients = action.payload
        },
        //ORDER API
        setOrder(state, action){
            state.numOrder = action.payload
        },

        selectedIngredientsAdd(state, action: PayloadAction<BurgerType>){
            if(action.payload.type === 'bun'){
                state.selectedBun = action.payload
            }else{
                state.selectedIngredients = [...state.selectedIngredients, {...action.payload}]
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
        selectedIngredientsClear(state){
            state.selectedIngredients = []
            state.selectedBun = null 
            state.statePrice = 0
        },
        currentIngredientAdd(state, action:PayloadAction<BurgerType>){
            state.currentIngredient = action.payload
        },
        currentIngredientRemove(state, action:PayloadAction<null>){
            state.currentIngredient = action.payload
        },
    }
})

export const { 
    selectedIngredientsAdd, 
    currentIngredientAdd, 
    currentIngredientRemove, 
    selectedIngredientsUpdate, 
    selectedIngredientDelete,
    selectedIngredientsClear,
    setOrder,
} = ingredientsSlice.actions

export default ingredientsSlice.reducer;