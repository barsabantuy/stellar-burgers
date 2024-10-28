import React, {useEffect} from 'react';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Modal(props) {

    const { children, onClose, title, root } = props;

    useEffect(() => {
        const handleEscapeButtonPress = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleEscapeButtonPress);
        return () => {
            document.removeEventListener("keydown", handleEscapeButtonPress);
        }
    }, [onClose]);

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <ModalOverlay onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={handleModalClick}>
                {title &&
                    <header>
                        <h2 className="text text_type_main-large mt-3 mb-1">{title}</h2>
                    </header>}
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
        </ModalOverlay>,
        root
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    root: PropTypes.instanceOf(Element).isRequired
};

export default Modal;
