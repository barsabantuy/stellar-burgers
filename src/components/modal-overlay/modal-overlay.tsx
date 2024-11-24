import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay extends React.HTMLAttributes<HTMLElement> {
    onClick: React.MouseEventHandler<HTMLElement>;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClick, children }) => {

    return (
        <div onClick={onClick} className={styles.modalOverlay}>
            {children}
        </div>
    );
}

export default ModalOverlay;
