import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../customHooks/redux';
import { boardFormSlice } from '../../store/reducers/BoardFormSlice';
import { Board } from '../../types/BoardsTypes';
import styles from './BoardList.module.css';

type Props = {
  boards: Board[];
  openConfirmModal: () => void;
};

function BoardList({ boards, openConfirmModal }: Props) {
  const { changeUpdateBoardModalIsOpen, changeUpdateData, changeDeleteData } =
    boardFormSlice.actions;
  const dispatch = useAppDispatch();

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>, board: Board) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(changeUpdateData(board));
    dispatch(changeUpdateBoardModalIsOpen(true));
  };

  const handleOpenDeleteConfirm = (e: React.MouseEvent<HTMLButtonElement>, board: Board) => {
    e.stopPropagation();
    e.preventDefault();
    openConfirmModal();
    dispatch(changeDeleteData(board));
  };

  return (
    <ul className={styles.list}>
      {boards.length ? (
        boards.map((board) => (
          <li key={board.id}>
            <Link to={`/boards/${board.id}`} className={styles.item}>
              <b className={styles.title}>{board.title}</b>
              <p className={styles.description}>{board.description}</p>
              <div className={styles.icons}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={(e) => handleOpenModal(e, board)}
                >
                  <i className="fa-solid fa-pen" />
                </button>
                <button
                  className={styles.button}
                  type="button"
                  onClick={(e) => handleOpenDeleteConfirm(e, board)}
                >
                  <i className="fa-solid fa-trash-can" />
                </button>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <FormattedMessage id="board-emptyBoards-message" />
        </div>
      )}
    </ul>
  );
}

export default BoardList;
