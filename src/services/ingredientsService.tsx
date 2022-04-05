import { createContext, Dispatch } from "react";
import { BurgerType } from "../types/Burger";

export const IngredientsDataContex = createContext<{
  	ingredients: BurgerType[];
    dispatchIngredients: Dispatch<any>;
}>({
	ingredients: [],
	dispatchIngredients: () => null,
});

export const SelectedIngredientsContex = createContext<{
    selectedIngredients: BurgerType[] ;
    dispatchIngredientsSelected: Dispatch<any>;
}>({
    selectedIngredients: [],
    dispatchIngredientsSelected: () => null,
});