
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';

// const initialIngredientsState:BurgerType[] = []

// const reducerIngredients = (state: BurgerType[], action:any) => {
// 	switch (action.type){
// 		case 'LOAD':
// 			return action.payload
			
// 		default: return state
// 	}
// }

// const initialSelectedIngredientsState = selectedIngredients

// const reducerSelectedIngredients = (state: any, action:{ type: string, payload: BurgerType }) => {
// 	switch (action.type){
// 		case 'ADD':	
// 			return state.map((item:any) => {
// 				if(item.type === 'bun' && action.payload.type === 'bun'){
// 					return action.payload
// 				}
// 				return item;
// 			});
// 		case 'REMOVE_ITEM':	
// 			return console.log('REMOVE');
			
// 		default: return state
// 	}
// }

function App() {

	return (
				<div className="App">
					<AppHeader />
					<div className={styles.container}>
						
						<BurgerIngredients />
						<BurgerConstructor />

					</div>
				</div>
	);
}

export default App;
