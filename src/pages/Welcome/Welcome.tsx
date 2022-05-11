import { useAppDispatch } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';
import styles from './Welcome.module.css';
import Task from '../../assets/welcome/task.webp';
import TeamWork from '../../assets/welcome/team-work.webp';

function Welcome() {
  const { changeTokenStatus, changeUserLoginStatus } = userSlice.actions;
  const dispatch = useAppDispatch();

  const changeTokenTrue = () => dispatch(changeTokenStatus(true));
  const changeTokenFalse = () => {
    dispatch(changeTokenStatus(false));
    dispatch(changeUserLoginStatus(false));
  };

  return (
    <div className={styles.container}>
      <div>
        Token Interface Deleted in the future
        <button
          className="border-2 border-black mb-2 hover:text-blue-400 p-1"
          type="button"
          onClick={changeTokenFalse}
        >
          The token is gone
        </button>
        <button
          className="border-2 border-black hover:text-blue-400 p-1"
          type="button"
          onClick={changeTokenTrue}
        >
          The token showed up
        </button>
      </div>
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
