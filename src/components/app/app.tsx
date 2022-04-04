import { useEffect, useReducer } from "react";
import { IngredientsDataContex, SelectedIngredientsContex } from "../../services/ingredientsService";
import { BurgerType } from "../../types/Burger";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';

const initialIngredientsState:BurgerType[] = []

const reducerIngredients = (state: BurgerType[], action:any) => {
	//console.log(action, state);
	switch (action.type){
		case 'LOAD':
			return action.payload
			
		default: return state
	}
}

const initialSelectedIngredientsState:string[] = [
	"60d3b41abdacab0026a733c6",
	"60d3b41abdacab0026a733c8",
	"60d3b41abdacab0026a733c9",
	"60d3b41abdacab0026a733c9",
	"60d3b41abdacab0026a733cc",
	"60d3b41abdacab0026a733d0",
	"60d3b41abdacab0026a733d0",
	"60d3b41abdacab0026a733d1",
	"60d3b41abdacab0026a733d3",
]

const reducerSelectedIngredients = (state: any, action:any) => {
	console.log(action);
	switch (action.type){
		case 'ADD':	
			return state.map((item:any) => {
				console.log(item);
				if(item.type === 'bun' && action.payload.type === 'bun'){
					return action.payload
				}
				return item;
			});
		case 'REMOVE_ITEM':	
			return console.log('REMOVE');
				// ...state,
				// selectedIngredients: state.map(item => {
				// 	console.log(item);
				// 	if(item.type === 'bun' && action.payload.type === 'bun'){
				// 		return action.payload
				// 	}
				// 	return item;
				// })
			
		default: return state
	}
}

function App() {

	const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients'

	const [ingredients, dispatchIngredients] = useReducer(reducerIngredients, initialIngredientsState)
	const [selectedIngredients, dispatchIngredientsSelected] = useReducer(reducerSelectedIngredients, initialSelectedIngredientsState)

	//dispatchIngredientsSelected({type: 'ADD', payload:"60666c42cc7b410027a1a9b1"})

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const response: any = await fetch(apiIngredients)
				if (!response.ok) {
					throw new Error('Ответ сети не был ok');
				}
				const res = await response.json();
				//console.log(res);
				dispatchIngredients({ type:'LOAD', payload: res.data })
			} catch (error:any) {
				console.log('Возникла проблема с вашим fetch запросом:', error.message);
			}
		}
		fetchIngredients()
	}, [])

	return (
		<IngredientsDataContex.Provider value={{ingredients, dispatchIngredients}}>
			<SelectedIngredientsContex.Provider value={{selectedIngredients, dispatchIngredientsSelected}}>
				<div className="App">
					<AppHeader />
					<div className={styles.container}>
						<BurgerIngredients />
							<BurgerConstructor />
					</div>
				</div>
			</SelectedIngredientsContex.Provider>
		</IngredientsDataContex.Provider>
	);
}

export default App;
