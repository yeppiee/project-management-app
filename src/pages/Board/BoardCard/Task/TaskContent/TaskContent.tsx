import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from '../../../../../components/Modal/Modal';
import {
  useDeleteTaskMutation,
  useGetAllUsersQuery,
  useGetBoardQuery,
} from '../../../../../store/reducers/TaskDealerApi';
import { TaskResponse } from '../../../../../Types/BoardTypes';
import ViewTaskModal from '../ViewTaskModal/ViewTaskModal';
import styles from './TaskContent.module.css';

type TaskContentPropsType = {
  task: TaskResponse;
  columnId: string;
};

function TaskContent({ task, columnId }: TaskContentPropsType) {
  const boardId = 'd805103c-e065-4b53-9312-2385b65f834a';
  const { refetch } = useGetBoardQuery(boardId);
  const { data: users } = useGetAllUsersQuery(boardId);
  const [deleteTask] = useDeleteTaskMutation();
  const [viewConfirmModal, setViewConfirmModal] = useState(false);
  const [viewTask, setViewTask] = useState(false);
  const viewDeleteModal = () => setViewConfirmModal(true);
  const closeModal = () => {
    setViewConfirmModal(false);
  };
  const handleDeletetask = async ({ id }: TaskResponse) => {
    await deleteTask({ boardId, columnId, taskId: id });
    refetch();
  };
  const openTask = () => setViewTask(true);
  const closeTask = () => setViewTask(false);

  return (
    <>
      <div className={styles.task} key={task.id}>
        <div onClick={openTask} role="button" tabIndex={0} className={styles.taskTitle}>
          {task.title}
        </div>
        <span
          role="button"
          aria-label="button-delete-task"
          tabIndex={0}
          onClick={viewDeleteModal}
          className={styles.delete}
        />
      </div>
      {viewTask && (
        <Modal closeModal={closeTask}>
          <ViewTaskModal task={task} users={users} handleClose={closeTask} />
        </Modal>
      )}
      {viewConfirmModal && (
        <Modal closeModal={closeModal}>
          <div className={styles.container}>
            <p className={styles.modalTitle}>
              <FormattedMessage id="modal-delete-task-title" />
            </p>
            <p>
              <FormattedMessage id="modal-delete-task-content" />
            </p>
            <div className={styles.controls}>
              <button className={styles.button} type="button" onClick={closeModal}>
                <FormattedMessage id="modal-delete-task-cancel" />
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={() => handleDeletetask(task)}
              >
                <FormattedMessage id="modal-delete-task-delete" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default TaskContent;
