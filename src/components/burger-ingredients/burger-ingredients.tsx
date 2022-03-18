import React from 'react'
import { BurgerType } from '../../types/Burger'


interface BurgerListType{
    burgerList: BurgerType[]
}

const BurgerIngredients:React.FC<BurgerListType> = ({burgerList})  => {
  return (
    <div>
        BurgerIngredients
    </div>
  )
}

export default BurgerIngredients