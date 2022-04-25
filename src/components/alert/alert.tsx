import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux';
import { clearMessage } from '../../services/store/reducers/user-slice';
import styles from './alert.module.css'

type TAlert = {
    type: string;
    delay?: number;
}

const Alert:FC <TAlert> = ({type, delay = 0, children}) => {

  const [visible, setVisible] = useState(true);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(delay){
      const timer = setTimeout(() => {
        dispatch(clearMessage())
        setVisible(false);
      }, delay);
      return () => clearTimeout(timer)
    }
  }, [delay]);

  return visible ? (
    <div className={`${styles.alert} ${styles[type]} mt-6`}>
       {children}
    </div>
  ) : null;
  
}

export default Alert