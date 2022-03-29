import React, { FC } from 'react'
import styles from './modal.module.css'

interface ModalOverlayType{
    color?: string;
    onClose: any;
}

const ModalOverlay:FC<ModalOverlayType> = ({color = '#585858', children, onClose}) => {
  return (
    <div className={styles.modal_overlay} onClick={onClose} style={{backgroundColor: color}}>
        {children}
    </div>
  )
}

export default ModalOverlay