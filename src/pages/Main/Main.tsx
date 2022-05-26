import { useEffect } from 'react';
import { useAppDispatch } from '../../customHooks/redux';
<<<<<<< HEAD
import { store } from '../../store';
=======
import { useGetAllBoardsQuery } from '../../store/reducers/TaskDealerApi';
>>>>>>> 2c5732d (feat: add api requests)
import { userSlice } from '../../store/reducers/UserSlice';
import styles from './Main.module.css';

function Main() {
  const { changeTokenStatus, changeUserLoginStatus } = userSlice.actions;
  const { data: boards, isLoading, error } = useGetAllBoardsQuery(null);
  const dispatch = useAppDispatch();
  const changeTokenFalse = () => {
    dispatch(changeTokenStatus(false));
    dispatch(changeUserLoginStatus(false));
  };
  const checkTokenTime = () => {
    const { timeToken } = store.getState().userSlice;
    const timeCurrent = Date.now() / 1000;
    const DAY = 86400;
    if (timeCurrent > Number(timeToken) + DAY) {
      changeTokenFalse();
    }
  };
  useEffect(() => {
    checkTokenTime();
  });
  return (
    <div className={styles.container}>
      Main
      <button
        className="border-2 border-black mb-2 hover:text-blue-400 p-1"
        type="button"
        onClick={changeTokenFalse}
      >
        The token is gone
      </button>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {boards &&
        boards.map((board) => (
          <div key={board.id}>
            <span>{board.title}</span>
            <span>{board.description}</span>
            <span />
          </div>
        ))}
    </div>
  );
}

export default Main;
