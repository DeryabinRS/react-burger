import { useEffect, useReducer } from "react";
import { IngredientsDataContex, SelectedIngredientsContex } from "../../services/ingredientsService";
import { BurgerType } from "../../types/Burger";
import { selectedIngredients } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';

const initialIngredientsState:BurgerType[] = []

const reducerIngredients = (state: BurgerType[], action:any) => {
	switch (action.type){
		case 'LOAD':
			return action.payload
			
		default: return state
	}
}

const initialSelectedIngredientsState = selectedIngredients

const reducerSelectedIngredients = (state: any, action:{ type: string, payload: BurgerType }) => {
	switch (action.type){
		case 'ADD':	
			return state.map((item:any) => {
				if(item.type === 'bun' && action.payload.type === 'bun'){
					return action.payload
				}
				return item;
			});
		case 'REMOVE_ITEM':	
			return console.log('REMOVE');
			
		default: return state
	}
}

function App() {

	const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients'

	const [ingredients, dispatchIngredients] = useReducer(reducerIngredients, initialIngredientsState)
	const [selectedIngredients, dispatchIngredientsSelected] = useReducer(reducerSelectedIngredients, initialSelectedIngredientsState)

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const response: any = await fetch(apiIngredients)
				if (!response.ok) {
					throw new Error('Ответ сети не был ok');
				}
				const res = await response.json();
				dispatchIngredients({ type:'LOAD', payload: res.data })
			} catch (error:any) {
				console.log('Возникла проблема с вашим fetch запросом:', error.message);
			}
		}
		fetchIngredients()
	}, [])

	return (
				<div className="App">
					<AppHeader />
					<div className={styles.container}>
						<IngredientsDataContex.Provider value={{ingredients, dispatchIngredients}}>
							<SelectedIngredientsContex.Provider value={{selectedIngredients, dispatchIngredientsSelected}}>
								<BurgerIngredients />
								<BurgerConstructor />
							</SelectedIngredientsContex.Provider>
						</IngredientsDataContex.Provider>
					</div>
				</div>
	);
}

export default App;
