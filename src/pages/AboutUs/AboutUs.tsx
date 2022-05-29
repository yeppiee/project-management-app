import { useIntl } from 'react-intl';
import styles from './AboutUs.module.css';
import Gena from '../../assets/Gena.jpg';
import Ivan from '../../assets/Ivan.jpg';
import Denis from '../../assets/Denis.jpg';

function AboutUs() {
  const intl = useIntl();
  return (
    <div className={styles.container}>
      <div className={styles.developer}>
        <div className={styles.wrapper}>
          <a href="https://github.com/pnv13" rel="noreferrer noopener" target="_blank">
            <img src={Ivan} alt="img" className={styles.img} />
          </a>
          <h3 className={styles.name}>
            {`${intl.formatMessage({ id: 'about-name-ivan' })} `}
            <br />
            {`${intl.formatMessage({ id: 'about-last-name-ivan' })} `}
          </h3>
          <p className={styles.position}>{intl.formatMessage({ id: 'about-position-lead' })}</p>
        </div>
        <span className={styles.text}>{intl.formatMessage({ id: 'about-work-ivan' })}</span>
      </div>
      <div className={styles.developer}>
        <div className={styles.wrapper}>
          <a href="https://github.com/GenaVinokurov" rel="noreferrer noopener" target="_blank">
            <img src={Gena} alt="img" className={styles.img} />
          </a>
          <h3 className={styles.name}>
            {`${intl.formatMessage({ id: 'about-name-gena' })} `}
            <br />
            {`${intl.formatMessage({ id: 'about-last-name-gena' })} `}
          </h3>
          <p className={styles.position}>
            {intl.formatMessage({ id: 'about-position-developer' })}
          </p>
        </div>
        <span className={styles.text}>{intl.formatMessage({ id: 'about-work-gena' })}</span>
      </div>
      <div className={styles.developer}>
        <div className={styles.wrapper}>
          <a href="https://github.com/DeGusar" rel="noreferrer noopener" target="_blank">
            <img src={Denis} alt="img" className={styles.img} />
          </a>
          <h3 className={styles.name}>
            {`${intl.formatMessage({ id: 'about-name-denis' })} `}
            <br />
            {`${intl.formatMessage({ id: 'about-last-name-denis' })} `}
          </h3>
          <p className={styles.position}>
            {intl.formatMessage({ id: 'about-position-developer' })}
          </p>
        </div>
        <span className={styles.text}>{intl.formatMessage({ id: 'about-work-denis' })}</span>
      </div>
    </div>
  );
}

export default AboutUs;
