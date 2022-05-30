import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { store } from '../../store';
import BoardList from '../../components/BoardList';
import Modal from '../../components/Modal';
import UpdateBoard from '../../components/BoardForms/UpdateBoard';
import { useAppDispatch, useAppSelector } from '../../customHooks/redux';
import { useDeleteBoardMutation, useGetAllBoardsQuery } from '../../store/reducers/TaskDealerApi';
import { userSlice } from '../../store/reducers/UserSlice';
import { boardFormSlice } from '../../store/reducers/BoardFormSlice';
import styles from './Main.module.css';
import ConfirmModal from '../../components/ConfirmModal';

function Main() {
  const [deleteBoard] = useDeleteBoardMutation();
  const { updateBoardModalIsOpen, deleteData } = useAppSelector((state) => state.boardFormSlice);
  const { changeTokenStatus, changeUserLoginStatus } = userSlice.actions;
  const { changeUpdateBoardModalIsOpen } = boardFormSlice.actions;
  const { data: boards, isLoading, error } = useGetAllBoardsQuery(null);
  const dispatch = useAppDispatch();
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const checkTokenTime = () => {
    const { timeToken } = store.getState().userSlice;
    const timeCurrent = Date.now() / 1000;
    const DAY = 86400;
    if (timeCurrent > Number(timeToken) + DAY) {
      dispatch(changeTokenStatus(false));
      dispatch(changeUserLoginStatus(false));
    }
  };

  useEffect(() => {
    checkTokenTime();
  });

  const closeModal = () => dispatch(changeUpdateBoardModalIsOpen(false));
  const closeConfirmModal = () => setConfirmModalIsOpen(false);
  const openConfirmModal = () => setConfirmModalIsOpen(true);

  const handleBoardDelete = () => {
    closeConfirmModal();
    deleteBoard(deleteData.id);
  };

  return (
    <div className={styles.container}>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {boards && <BoardList boards={boards} openConfirmModal={openConfirmModal} />}
      {updateBoardModalIsOpen && (
        <Modal closeModal={closeModal}>
          <UpdateBoard closeModal={closeModal} />
        </Modal>
      )}
      {confirmModalIsOpen && (
        <ConfirmModal closeConfirmModal={closeConfirmModal} handleBoardDelete={handleBoardDelete}>
          <FormattedMessage id="main-confirm-modal-text" />
        </ConfirmModal>
      )}
    </div>
  );
}

export default Main;
