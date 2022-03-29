import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';

function App() {

	const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients'

	const [ingredients, setIngredients] = useState([])

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				let response: any = await fetch(apiIngredients)
				response = await response.json()
				if (!response.success) {
					throw new Error('Ошибка сервера');
				}
				setIngredients(response.data)
			} catch (error) {
				console.log(error);
			}
		}
		fetchIngredients()
	}, [])

	return (
		<div className="App">
			<AppHeader />
			<div className={styles.container}>
				<BurgerIngredients burgerList={ingredients} />
				<BurgerConstructor burgerList={ingredients} />
			</div>
		</div>
	);
}

export default App;
