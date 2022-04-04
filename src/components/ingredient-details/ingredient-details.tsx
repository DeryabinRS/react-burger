import { FC } from 'react'
import styles from './ingredient-details.module.css'

interface IngredientDetailsType {
    name: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    image: string;
}

const IngredientDetails: FC<IngredientDetailsType> = ({ name, proteins, fat, carbohydrates, calories, image }) => {
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={image} alt="Done"/>
            </div>
            <div className={`${styles.name} pt-4`}>
                {name}
            </div>
            <div className={`${styles.desc} pt-8`}>
                <div className="pr-5">Калории,ккал<br /><span>{calories}</span></div>
                <div className="pr-5">Белки, г<br /><span>{proteins}</span></div>
                <div className="pr-5">Жиры, г<br /><span>{fat}</span></div>
                <div>Углеводы, г<br /><span>{carbohydrates}</span></div>
            </div>
        </div>
    )
}

export default IngredientDetails