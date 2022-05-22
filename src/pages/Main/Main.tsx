import { useAppDispatch } from '../../customHooks/redux';
import { useGetAllBoardsQuery } from '../../store/reducers/TaskDealerApi';
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
          <div>
            <span>{board.title}</span>
            <span>{board.description}</span>
            <span />
          </div>
        ))}
    </div>
  );
}

export default Main;
