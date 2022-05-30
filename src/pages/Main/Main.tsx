import { useEffect, useState, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
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
import Search from '../../components/Search/Search';

function Main() {
  const [deleteBoard] = useDeleteBoardMutation();
  const { searchInput } = useAppSelector((state) => state.userSlice);
  const { updateBoardModalIsOpen, deleteData } = useAppSelector((state) => state.boardFormSlice);
  const { changeTokenStatus, changeUserLoginStatus } = userSlice.actions;
  const { changeUpdateBoardModalIsOpen } = boardFormSlice.actions;
  const {
    data: notSortedBoards,
    isLoading,
    error,
  } = useGetAllBoardsQuery(null, { refetchOnMountOrArgChange: true });
  const dispatch = useAppDispatch();
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const intl = useIntl();

  const boards = useMemo(() => {
    if (notSortedBoards && searchInput) {
      return notSortedBoards.filter((board) => board.title.includes(searchInput));
    }
    return notSortedBoards;
  }, [notSortedBoards, searchInput]);

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
    deleteBoard(deleteData.id)
      .unwrap()
      .then(() => toast.success(intl.formatMessage({ id: 'toast-deleteBoard-form-success' })))
      .catch(() => toast.error(intl.formatMessage({ id: 'toast-deleteBoard-form-error' })));
  };

  return (
    <div className={styles.container}>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      <Search />
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
