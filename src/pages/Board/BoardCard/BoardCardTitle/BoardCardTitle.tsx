import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '../../../../components/Modal/Modal';
/* import { useParams } from 'react-router-dom'; */
import {
  useDeleteColumnMutation,
  useGetBoardQuery,
  useUpdateColumnMutation,
} from '../../../../store/reducers/TaskDealerApi';
import { CreateColumnResponseType } from '../../../../Types/BoardTypes';
import styles from './BoardCardTitle.module.css';

type CardPropsType = {
  column: CreateColumnResponseType;
};

function BoardCardTitle({ column: { title, id, order } }: CardPropsType) {
  const boardId = '794fb28f-6a9f-4c48-9def-ec9d7964151b';
  const { refetch } = useGetBoardQuery(boardId);
  const [deleteColumn] = useDeleteColumnMutation();
  const [renameColumn] = useUpdateColumnMutation();
  const [isTitleView, setTitleView] = useState(true);
  const [titleInputValue, setTitleInputValue] = useState(title);
  const [viewConfirmModal, setViewConfirmModal] = useState(false);
  const onClickTitle = () => setTitleView(false);
  const onClickCancel = () => {
    setTitleView(true);
    setTitleInputValue(title);
  };
  const onClickSubmitRename = async () => {
    if (titleInputValue.length === 0) {
      return null;
    }
    await renameColumn({ columnId: id, boardId, order, title: titleInputValue });
    refetch();
    return setTitleView(true);
  };
  const onClickDeleteColumn = async () => {
    setViewConfirmModal(true);
  };
  const callDeleteColumn = async () => {
    if (boardId) await deleteColumn({ columnId: id, boardId });
    refetch();
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleInputValue(e.target.value);
  const closeModal = () => setViewConfirmModal(false);

  return (
    <>
      {isTitleView ? (
        <div className={styles.titleContainer}>
          <div className={styles.titleContainer} role="button" tabIndex={0} onClick={onClickTitle}>
            <p className={styles.titleContent}>{title}</p>
          </div>
          <button
            type="button"
            className={styles.delete}
            aria-label="delete-column"
            onClick={onClickDeleteColumn}
          />
        </div>
      ) : (
        <div className={styles.titleContainer}>
          <button
            type="button"
            aria-label="submit-rename-button"
            tabIndex={-1}
            className={styles.submit}
            onClick={onClickSubmitRename}
          />
          <button
            type="button"
            aria-label="cancel-button"
            className={styles.cancel}
            onClick={onClickCancel}
          />
          <input
            value={titleInputValue}
            tabIndex={0}
            onChange={onChangeTitle}
            className={styles.titleInput}
            type="text"
          />
        </div>
      )}
      {viewConfirmModal && (
        <Modal closeModal={closeModal}>
          <div className={styles.container}>
            <p className={styles.modalTitle}>
              <FormattedMessage id="modal-delete-column-title" />
            </p>
            <p>
              <FormattedMessage id="modal-delete-column-content" />
            </p>
            <div className={styles.controls}>
              <button className={styles.button} type="button" onClick={closeModal}>
                <FormattedMessage id="modal-delete-column-cancel" />
              </button>
              <button type="button" className={styles.button} onClick={callDeleteColumn}>
                <FormattedMessage id="modal-delete-column-delete" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default BoardCardTitle;
