import { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { useAppDispatch } from '../hooks/redux'
import { fetchIngredients } from '../services/store/actions/action-ingredients'

const AppPage = () => {
  const dispatch = useAppDispatch()
	useEffect(() => {
        dispatch(fetchIngredients())
    },[dispatch])
  return (
	<>
		<DndProvider backend={HTML5Backend}>
			
				<div className="row">
					<BurgerIngredients />
					<BurgerConstructor />
				</div>
			
		</DndProvider>
	</>  
  )
}

export default AppPage