import React, { FC, SyntheticEvent, useEffect } from 'react';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal extends React.HTMLAttributes<HTMLElement> {
    onClose: () => void;
}

const modalRoot = document.getElementById('modals');

const Modal: FC<IModal> = ({ onClose, children }: IModal) => {

    useEffect(() => {
        const handleEscapeButtonPress = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleEscapeButtonPress);
        return () => {
            document.removeEventListener("keydown", handleEscapeButtonPress);
        }
    }, [onClose]);

    if (!modalRoot) {
        return null;
    }

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (e: SyntheticEvent) => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <ModalOverlay onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={handleModalClick}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
}

export default Modal;
