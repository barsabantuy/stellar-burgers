import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {

    return (
        <div onClick={props.onClick} className={styles.modalOverlay}>
            {props.children}
        </div>
    );
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default ModalOverlay;
