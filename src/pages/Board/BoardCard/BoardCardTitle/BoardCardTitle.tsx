import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import ConfirmModal from '../../../../components/ConfirmModal';
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} from '../../../../store/reducers/TaskDealerApi';
import { CreateColumnResponseType } from '../../../../types/BoardTypes';
import styles from './BoardCardTitle.module.css';

type CardPropsType = {
  column: CreateColumnResponseType;
};

function BoardCardTitle({ column: { title, id: columnId, order } }: CardPropsType) {
  const { id } = useParams();
  const boardId = id as string;
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
    await renameColumn({ columnId, boardId, order, title: titleInputValue });
    return setTitleView(true);
  };
  const onClickDeleteColumn = async () => {
    setViewConfirmModal(true);
  };
  const callDeleteColumn = async () => {
    if (boardId) await deleteColumn({ columnId, boardId });
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
        <ConfirmModal closeConfirmModal={closeModal} handleBoardDelete={callDeleteColumn}>
          <FormattedMessage id="modal-delete-column-title" />
        </ConfirmModal>
      )}
    </>
  );
}

export default BoardCardTitle;
