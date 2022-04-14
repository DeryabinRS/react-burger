import { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useAppDispatch } from '../../hooks/redux'
import { fetchIngredients } from '../../services/store/actions/action-ingredients'
import styles from './app.module.css';

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
        dispatch(fetchIngredients())
    },[dispatch])
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
