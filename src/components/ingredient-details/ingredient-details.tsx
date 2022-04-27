import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { BurgerType } from '../../types/burger-types'
import styles from './ingredient-details.module.css'

const IngredientDetails: FC = () => {
    const { id } = useParams()

    const ingredients = useAppSelector(store => store.ingredientsSlice.ingredients)
    
    const ingredient:BurgerType | undefined = ingredients.find(item => item._id === id);

    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={ingredient?.image} alt="Done"/>
            </div>
            <div className={`${styles.name} pt-4`}>
                {ingredient?.name}
            </div>
            <div className={`${styles.desc} pt-8`}>
                <div className="pr-5">Калории,ккал<br /><span>{ingredient?.calories}</span></div>
                <div className="pr-5">Белки, г<br /><span>{ingredient?.proteins}</span></div>
                <div className="pr-5">Жиры, г<br /><span>{ingredient?.fat}</span></div>
                <div>Углеводы, г<br /><span>{ingredient?.carbohydrates}</span></div>
            </div>
        </div>
    )
}

export default IngredientDetails