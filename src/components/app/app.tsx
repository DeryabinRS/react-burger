import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { burgerList } from "../../utils/data";
import styles from './app.module.css';


function App() {
  	return (
	  	<div className="App">  
			<AppHeader/>
			<div className={styles.container}>
				<BurgerIngredients burgerList={burgerList}/>
				<BurgerConstructor/>
			</div>
		</div>
	);
}

export default App;
