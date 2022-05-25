import React from 'react';
import { TaskResponse, UsersDataType } from '../../../../../Types/BoardTypes';
import styles from './ViewTaskModal.module.css';

type ViewTaskModalPropsType = {
  task: TaskResponse;
  handleClose: () => void;
  users: UsersDataType[];
};

function ViewTaskModal({ task, handleClose, users }: ViewTaskModalPropsType) {
  return (
    <div className={styles.container}>
      <div>{task.title}</div>
      <div>{task.description}</div>
      <select className={styles.select} defaultValue={task.userId}>
        {users?.length > 0 &&
          users.map((user: UsersDataType) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
      </select>
      <span
        role="button"
        tabIndex={0}
        aria-label="close-modal"
        onClick={handleClose}
        className={styles.delete}
      />
    </div>
  );
}

export default ViewTaskModal;
