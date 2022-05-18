import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../../components/LanguageSwitcher';
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
              <FormattedMessage id="header-button-home" />
            </Link>
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />
            <button type="button" className={styles.link} onClick={handleSignOut}>
              <FormattedMessage id="header-button-signOut" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div />
          {tokenStatus ? (
            <div className="flex items-center">
              <LanguageSwitcher />
              <button type="button" onClick={handleLogIn} className={styles.link}>
                <FormattedMessage id="header-button-toMain" />
              </button>
            </div>
          ) : (
            <div className={styles.authorization}>
              <LanguageSwitcher />
              <Link className={styles.link} to="/signUp">
                <FormattedMessage id="header-button-signup" />
              </Link>
              <span>/</span>
              <Link className={styles.link} to="/signIn">
                <FormattedMessage id="header-button-signin" />
              </Link>
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
