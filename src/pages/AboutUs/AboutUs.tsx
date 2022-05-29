import styles from './AboutUs.module.css';
import Gena from '../../assets/Gena.jpg';
import Ivan from '../../assets/Ivan.jpg';
import Denis from '../../assets/Denis.jpg';
import GitHub from '../../assets/GitHub.png';
import { useIntl } from 'react-intl';

function AboutUs() {
  const intl = useIntl();
  return (
    <div className={styles.container}>
      <div className={styles.developer}>
        <img src={Ivan} alt="img" className={styles.img} />
        <h3 className={styles.name}>
          {`${intl.formatMessage({ id: 'about-name-ivan' })} `}
          <br />
          {`${intl.formatMessage({ id: 'about-last-name-ivan' })} `}
        </h3>
        <p className={styles.text}>Team-lead</p>
        <span className={styles.text}>Настроил API, Авторизация, Страница игр, игра Аудиовызов, запуск игр со страниц учебника.</span>
        <a href="https://github.com/pnv13" className={styles.github}>
          <img src={GitHub} className={styles.git__img} alt="img" />
        </a>
      </div>
      <div className={styles.developer}>
        <img src={Gena} alt="img" className={styles.img} />
        <h3 className={styles.name}>
          {`${intl.formatMessage({ id: 'about-name-gena' })} `}
          <br />
          {`${intl.formatMessage({ id: 'about-last-name-gena' })} `}
        </h3>
        <p className={styles.text}>Developer</p>
        <span className={styles.text}>Базовая структура проекта(Header, Main, Footer, adaptive/responsive), Главная страница, Стилизация игр, Вывод результатов игр, Страница О Команде, игра Спринт.</span>
        <a href="https://github.com/GenaVinokurov" className={styles.github}>
          <img src={GitHub} className={styles.git__img} alt="img" />
        </a>
      </div>
      <div className={styles.developer}>
        <img src={Denis} alt="img" className={styles.img} />
        <h3 className={styles.name}>
          {`${intl.formatMessage({ id: 'about-name-denis' })} `}
          <br />
          {`${intl.formatMessage({ id: 'about-last-name-denis' })} `}
        </h3>
        <p className={styles.text}>Developer</p>
        <span className={styles.text}>Базовая структура проекта(Header, Main, Footer, adaptive/responsive), Главная страница, Стилизация игр, Вывод результатов игр, Страница О Команде, игра Спринт.</span>
        <a href="https://github.com/GenaVinokurov" className={styles.github}>
          <img src={GitHub} className={styles.git__img} alt="img" />
        </a>
      </div>
    </div>
  )
}

export default AboutUs;
