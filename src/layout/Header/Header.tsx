import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';
import styles from './Header.module.css';

type HeaderProps = {
  handleChange: () => void;
};

function Header({ handleChange }: HeaderProps) {
  const { userLoginStatus, tokenStatus } = useAppSelector((state) => state.userSlice);
  const { changeUserLoginStatus } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => dispatch(changeUserLoginStatus(false));
  const handleLogIn = () => {
    dispatch(changeUserLoginStatus(true));
    navigate('/');
  };

  return (
    <header className={styles.container}>
      {userLoginStatus && tokenStatus ? (
        <>
          <div className="flex items-center leading-4">
            <button className={styles.burger} type="button" onClick={handleChange}>
              <i className="fa-solid fa-bars" />
            </button>
            <Link className={styles.link} to="/">
              Home
            </Link>
          </div>
          <button type="button" className={styles.link} onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link className={styles.link} to="/welcome">
            Welcome
          </Link>
          {tokenStatus ? (
            <button type="button" onClick={handleLogIn} className={styles.link}>
              Go to Main Page
            </button>
          ) : (
            <div className={styles.authorization}>
              <Link className={styles.link} to="/signUp">
                SignUp
              </Link>
              <span>/</span>
              <Link className={styles.link} to="/signIn">
                SignIn
              </Link>
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
