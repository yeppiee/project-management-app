import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const portalDiv = document.getElementById('portal') as HTMLElement;

type ModalPropsType = {
  children: React.ReactNode;
  closeModal: () => void;
};

function Modal({ children, closeModal }: ModalPropsType) {
  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <div
        role="button"
        aria-label="overlay"
        tabIndex={0}
        className={styles.overlay}
        onClick={closeModal}
      />
      <div className={styles.container}>{children}</div>
    </>,
    portalDiv
  );
}

export default Modal;
