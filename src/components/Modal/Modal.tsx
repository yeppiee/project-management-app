import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type ModalPropsType = {
  children: React.ReactNode;
  closeModal: () => void;
};

function Modal({ children, closeModal }: ModalPropsType) {
  const portalDiv = document.getElementById('portal') as HTMLElement;
  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, []);

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
