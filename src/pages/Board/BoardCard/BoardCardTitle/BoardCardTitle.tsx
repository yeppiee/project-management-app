import React, { useState } from 'react';
/* import { useParams } from 'react-router-dom'; */
import {
  useDeleteColumnMutation,
  useGetBoardQuery,
} from '../../../../store/reducers/TaskDealerApi';
import styles from './BoardCardTitle.module.css';

type CardPropsType = {
  columnName: string;
  columnId: string;
};

function BoardCardTitle({ columnName, columnId }: CardPropsType) {
  const boardId = 'd805103c-e065-4b53-9312-2385b65f834a';
  const { refetch } = useGetBoardQuery(boardId);
  const [deleteColumn] = useDeleteColumnMutation();
  const [isTitleView, setTitleView] = useState(true);
  const [titleInputValue, setTitleInputValue] = useState('');
  const onClickTitle = () => setTitleView(false);
  const onClickCancel = () => {
    setTitleView(true);
    setTitleInputValue('');
  };
  const onClickSubmitRename = () => {
    if (titleInputValue.length === 0) {
      return null;
    }
    return setTitleView(true);
  };
  const onClickDeleteColumn = async () => {
    if (boardId) await deleteColumn({ columnId, boardId });
    refetch();
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleInputValue(e.target.value);
  return isTitleView ? (
    <div className={styles.titleContainer}>
      <div className={styles.titleContainer} role="button" tabIndex={0} onClick={onClickTitle}>
        <p className={styles.titleContent}>{columnName}</p>
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
  );
}

export default BoardCardTitle;
