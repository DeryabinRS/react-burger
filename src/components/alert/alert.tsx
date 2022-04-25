import { FC, useEffect, useState } from 'react'
import styles from './alert.module.css'

type TAlert = {
    type: string;
    delay?: number;
}

const Alert:FC<TAlert> = ({type, delay = 0, children}) => {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, delay);
    return () => clearTimeout(timer)
  }, [delay]);

  return visible && (
    <div className={`${styles.alert} ${styles[type]} mt-6`}>
       {children}
    </div>
  )
  
}

export default Alert