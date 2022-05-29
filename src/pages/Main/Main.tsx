import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
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
  const {
    data: boards,
    isLoading,
    error,
  } = useGetAllBoardsQuery(null, { refetchOnMountOrArgChange: true });
  const dispatch = useAppDispatch();
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const intl = useIntl();

  const checkTokenTime = () => {
    const { timeToken } = store.getState().userSlice;
    const timeCurrent = Date.now() / 1000;
    const DAY = 86400;
    if (timeCurrent > Number(timeToken) + DAY) {
      dispatch(changeTokenStatus(false));
      dispatch(changeUserLoginStatus(false));
      toast.warn(intl.formatMessage({ id: 'toast-token-broken' }));
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
    toast.promise(deleteBoard(deleteData.id), {
      pending: `${intl.formatMessage({ id: 'toast-deleteBoard-form-pending' })}`,
      success: `${intl.formatMessage({ id: 'toast-deleteBoard-form-success' })} 👌`,
      error: `${intl.formatMessage({ id: 'toast-deleteBoard-form-error' })}`,
    });
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
          Do you Want Delete Board?
        </ConfirmModal>
      )}
    </div>
  );
}

export default Main;
