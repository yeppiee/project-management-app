import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '../../../../components/Modal/Modal';
import { CreateColumnResponseType } from '../../../../Types/BoardTypes';
import styles from './Task.module.css';
import TaskContent from './TaskContent/TaskContent';
import CreateTaskModal from './CreateTaskModal/CreateTaskModal';

type TaskPropsType = {
  column: CreateColumnResponseType;
};

function Task({ column }: TaskPropsType) {
  const boardId = '794fb28f-6a9f-4c48-9def-ec9d7964151b';
  const [isOpenModal, setOpenModal] = useState(false);

  const handleCancelModal = () => setOpenModal(false);
  const handleCreateTask = () => setOpenModal(true);

  return (
    <>
      <div className={styles.taskContainer}>
        {column.tasks.length > 0 &&
          column.tasks.map((task) => {
            return <TaskContent task={task} key={task.id} columnId={column.id} />;
          })}
        <button type="button" onClick={handleCreateTask} className={styles.buttonAddTask}>
          <span className={styles.plus} />
          <p>
            <FormattedMessage id="task-button-create-task" />
          </p>
        </button>
      </div>
      {isOpenModal && (
        <Modal closeModal={() => setOpenModal(false)}>
          <CreateTaskModal boardId={boardId} column={column} handleCancel={handleCancelModal} />
        </Modal>
      )}
    </>
  );
}

export default Task;
