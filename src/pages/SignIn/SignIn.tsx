import { useNavigate } from 'react-router-dom';
import BackToWelcomePage from '../../components/BackToWelcomePage';
import { useAppDispatch } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';

function SignIn() {
  const { changeUserLoginStatus, changeTokenStatus } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogIn = () => {
    dispatch(changeUserLoginStatus(true));
    dispatch(changeTokenStatus(true));
    navigate('/');
  };

  return (
    <div className="flex flex-col p-3">
      <BackToWelcomePage />
      SignIn
      <button className="border-2 border-black mr-auto p-3" type="button" onClick={handleLogIn}>
        SignIn
      </button>
    </div>
  );
}

export default SignIn;
