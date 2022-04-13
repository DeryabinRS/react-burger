import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerType } from "../../../types/burger-types";

type initialStateType = {
    selectedIngredients: BurgerType[];
    selectedBun: BurgerType | null,
    statePrice: number;
}

const initialState:initialStateType = {
    selectedIngredients: [],
    selectedBun: null,
    statePrice: 0,
}

export const constructorSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers:{
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
    }
})

export const { 
    selectedIngredientsAdd,  
    selectedIngredientsUpdate, 
    selectedIngredientDelete,
    selectedIngredientsClear,

} = constructorSlice.actions

export default constructorSlice.reducer;