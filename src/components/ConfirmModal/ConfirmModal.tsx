import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './ConfirmModal.module.css';

type Props = {
  closeConfirmModal: () => void;
  handleBoardDelete: () => void;
  children: React.ReactNode;
};

function ConfirmModal({ children, closeConfirmModal, handleBoardDelete }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{children}</h1>
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={closeConfirmModal}>
            <FormattedMessage id="confirm-modal-cancel" />
          </button>
          <button type="button" className={styles.ok} onClick={handleBoardDelete}>
            <FormattedMessage id="confirm-modal-ok" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
