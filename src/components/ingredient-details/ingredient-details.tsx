import { FC } from 'react'
import { useAppSelector } from '../../hooks/redux'
import styles from './ingredient-details.module.css'

const IngredientDetails: FC = () => {
    const ingredient = useAppSelector(store => store.ingredientsSlice.currentIngredient)
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