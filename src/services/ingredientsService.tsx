import { createContext, Dispatch } from "react";
import { BurgerType } from "../types/Burger";

type InitialStateType = {
  	ingredients: BurgerType[];
  	selectedIngredients: BurgerType[];
};

const intialState = {
	ingredients: [],
  	selectedIngredients: [],
}

export const IngredientsDataContex = createContext<{
  	state: InitialStateType;
	dispatchState: Dispatch<any>;
}>({
	state: intialState,
	dispatchState: () => null,
});
