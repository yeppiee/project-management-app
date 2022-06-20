import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBurgerMenuLinks from '../../customHooks/useBurgerMenuLinks';
import styles from './BurgerMenu.module.css';

type BurgerMenuProps = {
  isActive: boolean;
  setInactive: () => void;
};

function BurgerMenu({ isActive, setInactive }: BurgerMenuProps) {
  const links = useBurgerMenuLinks();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInactive();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setInactive]);

  return (
    <div
      className={isActive ? `${styles.container} ${styles.active}` : `${styles.container}`}
      onClick={setInactive}
      role="menu"
      tabIndex={0}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()} role="menu" tabIndex={0}>
        <div className="mt-3 mb-3 pl-32">
          <button className={styles.button} onClick={setInactive} type="button">
            <i className="fa-solid fa-angle-left" />
          </button>
        </div>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.id} className={styles.listItem}>
              <Link to={link.path} onClick={setInactive}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BurgerMenu;
