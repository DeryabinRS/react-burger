import { FC } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { BurgerType } from '../../types/burger-types'
import styles from './ingredient-details.module.css'

interface IngredientDetailsType {
    id?: string
}

const IngredientDetails: FC<IngredientDetailsType> = ({id}) => {
    const ingredient = useAppSelector(store => store.ingredientsSlice.currentIngredient)
    const ingredients = useAppSelector(store => store.ingredientsSlice.ingredients)
    let findIngredientById: BurgerType | undefined;
    if(id) findIngredientById = ingredients.filter(item => item._id === id).shift();
    const ing = id ? findIngredientById : ingredient;

    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={ing?.image} alt="Done"/>
            </div>
            <div className={`${styles.name} pt-4`}>
                {ing?.name}
            </div>
            <div className={`${styles.desc} pt-8`}>
                <div className="pr-5">Калории,ккал<br /><span>{ing?.calories}</span></div>
                <div className="pr-5">Белки, г<br /><span>{ing?.proteins}</span></div>
                <div className="pr-5">Жиры, г<br /><span>{ing?.fat}</span></div>
                <div>Углеводы, г<br /><span>{ing?.carbohydrates}</span></div>
            </div>
        </div>
    )
}

export default IngredientDetails