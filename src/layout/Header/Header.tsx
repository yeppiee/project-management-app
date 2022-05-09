import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';
import styles from './Header.module.css';

type HeaderProps = {
  handleChange: () => void;
};

function Header({ handleChange }: HeaderProps) {
  const { userLoginStatus } = useAppSelector((state) => state.userSlice);
  const { changeUserLoginStatus } = userSlice.actions;
  const dispatch = useAppDispatch();

  const handleLogOut = () => dispatch(changeUserLoginStatus(false));

  return (
    <header className={styles.container}>
      {userLoginStatus ? (
        <div className="flex items-center leading-4">
          <button className={styles.burger} type="button" onClick={handleChange}>
            <i className="fa-solid fa-bars" />
          </button>
          <Link className={styles.link} to="/">
            Home
          </Link>
        </div>
      ) : (
        <Link className={styles.link} to="/welcome">
          Welcome
        </Link>
      )}
      {userLoginStatus ? (
        <button type="button" className="border-2 border-white p-1" onClick={handleLogOut}>
          LogOut
        </button>
      ) : (
        <div className={styles.authorization}>
          <Link className={styles.link} to="/SignUp">
            SignUp
          </Link>
          <span>/</span>
          <Link className={styles.link} to="/SignIn">
            SignIn
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
