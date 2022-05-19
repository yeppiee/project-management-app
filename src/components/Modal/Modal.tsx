/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalPropsType } from '../../Types/modalTypes';
import styles from './Modal.module.css';

function Modal({ isOpen, children, closeModal }: ModalPropsType) {
  const portalDiv = document.getElementById('portal') as HTMLElement;
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
    return document.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }, [closeModal]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div role="button" tabIndex={0} className={styles.overlay} onClick={closeModal}>
      <div
        role="button"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={styles.container}
      >
        {children}
      </div>
    </div>,

    portalDiv
  );
}

export default Modal;
