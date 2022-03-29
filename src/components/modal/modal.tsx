import React, { FC, useState } from 'react'
import ModalOverlay from './modal-overlay';
import styles from './modal.module.css'

interface ModalType{
    title?: string;
    modalOverlayColor?: string;
    isActive: boolean;
    handleCloseModal: Function;
}

const Modal:FC<ModalType> = ({title, modalOverlayColor, children, isActive, handleCloseModal}) => {
    return (
        isActive ? 
        <ModalOverlay color={modalOverlayColor} onClose={handleCloseModal}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.btn_close} onClick={() => handleCloseModal()}>&#10006;</div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </ModalOverlay>
        : null
    )
}

export default Modal