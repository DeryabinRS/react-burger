import { FC } from 'react'
import Modal from '../modal/modal'

interface ModalCustomType {
    title?: string;
    isActive: boolean;
    handleCloseModal: () => void;
    escFunction: any;
}

const ModalCustom: FC<ModalCustomType> = ({ title, isActive, handleCloseModal, children, escFunction}) => {
    return (
        <Modal title={title} isActive={isActive} handleCloseModal={handleCloseModal} escFunction={escFunction}>
            {children}
        </Modal>
    )
}

export default ModalCustom