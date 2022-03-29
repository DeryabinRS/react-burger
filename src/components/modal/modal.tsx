import { FC, useEffect } from 'react'
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface ModalType {
    title?: string;
    modalOverlayColor?: string;
    isActive: boolean;
    handleCloseModal: () => void;
    escFunction: any;
}

const Modal: FC<ModalType> = ({ title, modalOverlayColor, children, isActive, handleCloseModal, escFunction }) => {

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    return (
        isActive ?
            <ModalOverlay onClose={handleCloseModal}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={styles.modal_header}>
                        <div className={styles.title}>{title}</div>
                        <div className={`${styles.btn_close} pt-2`} onClick={handleCloseModal}><CloseIcon type="primary" /></div>
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
