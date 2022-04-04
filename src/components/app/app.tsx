import { useState, useEffect, useReducer } from "react";
import { IngredientsDataContex } from "../../services/ingredientsService";
import { BurgerType } from "../../types/Burger";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';

const initialState = {
	ingredients: [],
	selectedIngredients: []
}

const reducerIngredients = ({ingredients, selectedIngredients}, action) => {
	switch (action.type){
		case 'ADD_INGREDIENT':
			return [...selectedIngredients, action.payload]
		case 'REMOVE_INGREDIENT':
			return [...selectedIngredients, action.payload]	
		default: return initialState
	}
}


function App() {

	const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients'

	const [state, setState] = useReducer(reducerIngredients, initialState)

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const response: any = await fetch(apiIngredients)
				if (!response.ok) {
					throw new Error('Ответ сети не был ok');
				}
				const res = await response.json();
				setIngredients(res.data)
			} catch (error:any) {
				console.log('Возникла проблема с вашим fetch запросом:', error.message);
			}
		}
		fetchIngredients()
	}, [])

	return (
		<IngredientsDataContex.Provider value={{stateIngredients, setStateIngredients}}>
			<div className="App">
				<AppHeader />
				<div className={styles.container}>
					<BurgerIngredients />
					<BurgerConstructor />
				</div>
			</div>
		</IngredientsDataContex.Provider>
	);
}

export default App;
