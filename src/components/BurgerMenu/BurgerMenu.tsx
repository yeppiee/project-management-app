import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import links from '../../constants/burgerMenuLinks';
import styles from './BurgerMenu.module.css';

type BurgerMenuProps = {
  isActive: boolean;
  setInactive: () => void;
};

function BurgerMenu({ isActive, setInactive }: BurgerMenuProps) {
  const eventKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setInactive();
  };

  useEffect(() => {
    document.addEventListener('keydown', eventKeyDown);
    return () => {
      document.removeEventListener('keydown', eventKeyDown);
    };
  }, []);

  return (
    <div
      className={isActive ? `${styles.container} ${styles.active}` : `${styles.container}`}
      onClick={setInactive}
      onKeyDown={() => eventKeyDown}
      role="menu"
      tabIndex={0}
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => eventKeyDown}
        role="menu"
        tabIndex={0}
      >
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