import { FC, useState, useEffect, useRef } from 'react'
import styles from './burger-ingredients.module.css'
import IngredientsCard from '../ingredients-card/ingredients-card'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchIngredients } from '../../services/store/actions/action-ingredients'

const BurgerIngredients: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const [current, setCurrent] = useState('one')

    const refBlock = useRef<HTMLDivElement>(null)
    const refTitle1 = useRef<HTMLDivElement>(null)
    const refTitle2 = useRef<HTMLDivElement>(null)
    const refTitle3 = useRef<HTMLDivElement>(null)

    const {ingredients} = useAppSelector(state => state.ingredientsSlice)

    useEffect(() => {
        dispatch(fetchIngredients())
    },[])

    const handleScroll = () => {
        const scrollY = refBlock?.current?.scrollTop || 0
        const refBlockTop = refBlock?.current?.offsetTop || 0;
        const sections = [refTitle1, refTitle2, refTitle3];
        let current:any = '';
        sections.forEach((section, i) => {
            const sectionTop = Math.abs(refBlockTop - (section.current?.offsetTop || 0));
            if(scrollY > sectionTop){
                current = section.current?.getAttribute('id')
                setCurrent(current)
            }
        });
    }

    return (
        <div className={styles.wrapper}>
            <div><h2 className={`${styles.h2} mt-10 mb-5`}>Собери бургер</h2></div>
            <div className={styles.flex}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div ref={refBlock} className={`${styles.wrapper_indredients} mt-10 scroll`} onScroll={handleScroll}>
                <div ref={refTitle1} id="one">
                    <h2 className={styles.title} >Булки</h2>
                    <div className={`${styles.ingredient_list} mb-10`}>
                        {ingredients.filter(item => item.type === 'bun').map(item => <IngredientsCard key={item._id} {...item} />)}
                    </div>
                </div>
                <div ref={refTitle2} id="two">
                    <h2 className={styles.title} >Соусы</h2>
                    <div className={`${styles.ingredient_list} mb-10`}>
                        {ingredients.filter(item => item.type === 'sauce').map(item => <IngredientsCard key={item._id} {...item} />)}
                    </div>
                </div>
                <div ref={refTitle3} id="three">
                    <h2 className={styles.title} >Начинки</h2>
                    <div className={`${styles.ingredient_list} mb-10`}>
                        {ingredients.filter(item => item.type === 'main').map(item => <IngredientsCard key={item._id} {...item} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients
