import { useEffect } from 'react';
import { useAppDispatch } from '../../customHooks/redux';
import { store } from '../../store';
import { userSlice } from '../../store/reducers/UserSlice';

function Home() {
  const { changeTokenStatus, changeUserLoginStatus } = userSlice.actions;
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
    <div className="flex flex-col items-center justify-center w-full h-full">
      Home
      <button
        className="border-2 border-black mb-2 hover:text-blue-400 p-1"
        type="button"
        onClick={changeTokenFalse}
      >
        The token is gone
      </button>
    </div>
  );
}

export default Home;
