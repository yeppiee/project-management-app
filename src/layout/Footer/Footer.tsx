import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={`${styles.container}`}>
      <div className={styles.wrapper}>
        <span>2022</span>
        <ul className={styles.developers}>
          <li>
            <a href="https://github.com/DeGusar" target="_blank" rel="noreferrer">
              DeGusar
            </a>
          </li>
          <li>
            <a href="https://github.com/GenaVinokurov" target="_blank" rel="noreferrer">
              GenaVinokurov
            </a>
          </li>
          <li>
            <a href="https://github.com/pnv13" target="_blank" rel="noreferrer">
              pnv13
            </a>
          </li>
        </ul>
        <a
          href="https://rs.school/"
          className={styles.school__logo}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.img} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
