import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type ModalPropsType = {
  isOpen: boolean;
  children: React.ReactNode;
  closeModal: () => void;
};

function Modal({ children, closeModal }: ModalPropsType) {
  const portalDiv = document.getElementById('portal') as HTMLElement;

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
    return document.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }, [closeModal]);

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
