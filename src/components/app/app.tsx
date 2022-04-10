import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';

function App() {
	return (
		<div className="App">
			<AppHeader />
			<div className={styles.container}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</div>
		</div>
	);
}

export default App;
