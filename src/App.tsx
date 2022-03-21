import React from "react";
import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import { burgerList } from "./utils/data";
import './App.css';


function App() {
  	return (
	  	<div className="App">  
			<AppHeader/>
			<div className="container">
				<BurgerIngredients burgerList={burgerList}/>
				<BurgerConstructor/>
			</div>
		</div>
	);
}

export default App;
