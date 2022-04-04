import { createContext } from "react";
import { BurgerType } from "../types/Burger";

type InitialStateType = {
    ingredients: [],
	selectedIngredients: []
}

export const IngredientsDataContex = createContext<{
  state: BurgerType[],  
}>({
    
})
