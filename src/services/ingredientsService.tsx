import { createContext } from "react";
import { BurgerType } from "../types/Burger";

export const IngredientsDataContex = createContext<BurgerType[]>([])