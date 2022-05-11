import { useAppDispatch } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';

function Welcome() {
  const { changeTokenStatus, changeUserLoginStatus } = userSlice.actions;
  const dispatch = useAppDispatch();

  const changeTokenTrue = () => dispatch(changeTokenStatus(true));
  const changeTokenFalse = () => {
    dispatch(changeTokenStatus(false));
    dispatch(changeUserLoginStatus(false));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      Welcome Page
      <button
        className="border-2 border-black mb-2 hover:text-blue-400 p-1"
        type="button"
        onClick={changeTokenFalse}
      >
        The token is gone
      </button>
      <button
        className="border-2 border-black hover:text-blue-400 p-1"
        type="button"
        onClick={changeTokenTrue}
      >
        The token showed up
      </button>
    </div>
  );
}

export default Welcome;
