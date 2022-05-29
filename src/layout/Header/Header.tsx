import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import headerLinks from '../../constants/headerLinks';
import { useAppDispatch, useAppSelector } from '../../customHooks/redux';
import { boardFormSlice } from '../../store/reducers/BoardFormSlice';
import { userSlice } from '../../store/reducers/UserSlice';
import styles from './Header.module.css';

type HeaderProps = {
  handleChange: () => void;
};

function Header({ handleChange }: HeaderProps) {
  const { userLoginStatus, tokenStatus } = useAppSelector((state) => state.userSlice);
  const { changeUserLoginStatus, changeTokenStatus } = userSlice.actions;
  const { changeCreateBoardModalIsOpen } = boardFormSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleSignOut = () => {
    dispatch(changeUserLoginStatus(false));
    dispatch(changeTokenStatus(false));
  };
  const handleLogIn = () => {
    dispatch(changeUserLoginStatus(true));
    navigate('/');
  };

  const handleOpenModal = () => dispatch(changeCreateBoardModalIsOpen(true));

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return userLoginStatus && tokenStatus ? (
    <header className={scroll > 0 ? `${styles.container} ${styles.sticky}` : styles.container}>
      <div className="flex items-center leading-4">
        <button className={styles.burger} type="button" onClick={handleChange}>
          <i className="fa-solid fa-bars" />
        </button>
        <div>
          {headerLinks.map((link) => (
            <Link className={styles.link} to={link.path} key={link.id}>
              <FormattedMessage id={link.localizationId} />
            </Link>
          ))}
          <button type="button" className={styles.link} onClick={handleOpenModal}>
            <FormattedMessage id="header-button-create-new-board" />
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <LanguageSwitcher />
        <button type="button" className={styles.link} onClick={handleSignOut}>
          <FormattedMessage id="header-button-signOut" />
        </button>
      </div>
    </header>
  ) : (
    <header className={styles.container}>
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
    </header>
  );
}

export default Header;
