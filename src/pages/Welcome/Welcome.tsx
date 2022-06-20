import { FormattedMessage } from 'react-intl';
import styles from './Welcome.module.css';
import Task from '../../assets/welcome/task.webp';
import TeamWork from '../../assets/welcome/team-work.webp';

function Welcome() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.images}>
          <img src={Task} alt="task" />
          <img src={TeamWork} alt="team-work" />
        </div>
        <div className={styles.text}>
          <h3>Project Management App</h3>
          <p>
            <FormattedMessage id="welcome-page-app-description" />
          </p>
          <p>
            <FormattedMessage id="welcome-page-app-about-team" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
