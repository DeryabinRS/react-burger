import { FC } from 'react'
import styles from './modal-overlay.module.css'

interface ModalOverlayType {
	onClose: () => void;
}

const ModalOverlay: FC<ModalOverlayType> = ({ children, onClose }) => {
	return (
		<div className={styles.modal_overlay} onClick={onClose}>
			{children}
		</div>
	)
}

export default ModalOverlay