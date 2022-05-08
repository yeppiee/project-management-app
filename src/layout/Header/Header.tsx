import { Link } from 'react-router-dom';
import styles from './Header.module.css';

type HeaderProps = {
  handleChange: () => void;
};

function Header({ handleChange }: HeaderProps) {
  return (
    <header className={styles.container}>
      <div className="flex items-center leading-4">
        <button className={styles.burger} type="button" onClick={handleChange}>
          <i className="fa-solid fa-bars" />
        </button>
        <Link className={styles.link} to="/">
          Home
        </Link>
      </div>
      <div className={styles.authorization}>
        <Link className={styles.link} to="/SignUp">
          SignUp
        </Link>
        <span>/</span>
        <Link className={styles.link} to="/SignIn">
          SignIn
        </Link>
      </div>
    </header>
  );
}

export default Header;
