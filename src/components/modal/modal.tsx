import { FC, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface ModalType {
    title?: string;
    isActive: boolean;
    handleToggleModal: (active: boolean) => void;
}

const modalBlock: any = document.getElementById('modal')

const Modal: FC<ModalType> = ({ title, children, isActive, handleToggleModal }) => {

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            handleToggleModal(false)
        }
    }, []);

    if (!isActive) return null;

    return createPortal(
        <ModalOverlay onClose={() => handleToggleModal(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.modal_header}>
                    <div className={styles.title}>{title}</div>
                    <div className={`${styles.btn_close} pt-2`} onClick={() => handleToggleModal(false)}><CloseIcon type="primary" /></div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </ModalOverlay>
        , modalBlock

    )
}

export default Modal
