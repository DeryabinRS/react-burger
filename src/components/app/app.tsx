import { useEffect, useReducer } from "react";
import { IngredientsDataContex } from "../../services/ingredientsService";
import { BurgerType } from "../../types/Burger";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';

type InitialStateType = {
	ingredients: BurgerType[];
	selectedIngredients: BurgerType[];
};

const initialState = {
	ingredients: [],
	selectedIngredients: []
}

const reducerIngredients = (state: InitialStateType, action:any) => {
	console.log(action);
	switch (action.type){
		case 'LOAD_INGREDIENTS_FROM_API':
			return {
				...state,
				ingredients: action.payload
			}
		case 'ADD_SELECTED_INGREDIENT':
			return {
				...state,
				selectedIngredients: [ ...state.selectedIngredients ].map(item => {
					console.log(item);
					if(item.type === 'bun' && action.payload.type === 'bun'){
						return action.payload
					}
					return item;
				})
			}	
		default: return state
	}
}

function App() {

	const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients'

	const [state, dispatchState] = useReducer(reducerIngredients, initialState)

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const response: any = await fetch(apiIngredients)
				if (!response.ok) {
					throw new Error('Ответ сети не был ok');
				}
				const res = await response.json();
				dispatchState( { type:'LOAD_INGREDIENTS_FROM_API', payload: res.data } )
			} catch (error:any) {
				console.log('Возникла проблема с вашим fetch запросом:', error.message);
			}
		}
		fetchIngredients()
	}, [])

	return (
		<IngredientsDataContex.Provider value={{state, dispatchState}}>
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
