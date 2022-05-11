import { useAppDispatch } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';

function Home() {
  const { changeTokenStatus, changeUserLoginStatus } = userSlice.actions;
  const dispatch = useAppDispatch();

  const changeTokenFalse = () => {
    dispatch(changeTokenStatus(false));
    dispatch(changeUserLoginStatus(false));
  };

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
