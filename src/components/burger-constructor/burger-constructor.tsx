import React from 'react'
import styles from './burger-constructor.module.css'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '@ya.praktikum/react-developer-burger-ui-components/dist/images/img.png'
import { burgerList } from '../../utils/data' 

const BurgerConstructor = () => {
  return (
    <>
      <div className="mt-25" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='pl-8 pb-4'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </div>
        <div className={`${styles.wrapper} scroll pr-2`}>
        {
          burgerList.map(item => (
            <div className={`${styles.element} pb-4`}> 
              <div className='pr-2'>
              <DragIcon type="primary"/>
              </div>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))
        }
        </div>
        <div className='pl-8 pt-4'> 
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
        <div className={`${styles.bottom} pt-10 mr-4 pb-15`}>
          <div className={styles.price}>
            <div className='pr-2'>610</div>
            <div className='pr-10'>
              <CurrencyIcon type="primary" /> 
            </div>
          </div>
          <div>
            <Button>Оформить заказ</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BurgerConstructor