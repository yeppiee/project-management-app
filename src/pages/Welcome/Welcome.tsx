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
            A project management system is an application that helps an individual or a group of
            developers achieve their goals. The project was part of The Rolling Scopes School React
            course.
          </p>
          <p>
            This project was created by a team of three people, you can find the authors GitHubs in
            the footer of the application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
