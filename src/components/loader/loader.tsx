import IMG from '../../images/loader.png'
import styles from './loader.module.css'

import React from 'react'

const Loader = () => {
  return (
    <div className={styles.loader}><img src={IMG} alt="Loader"/></div>
  )
}

export default Loader