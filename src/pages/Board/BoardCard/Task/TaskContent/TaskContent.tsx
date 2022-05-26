import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
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
  index: number;
};

function TaskContent({ task, columnId, index }: TaskContentPropsType) {
  const { id: boardId } = useParams();
  const { refetch } = useGetBoardQuery(boardId);
  const { data } = useGetAllUsersQuery(boardId);
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
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className={styles.task}
            key={task.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
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
        )}
      </Draggable>
      {viewTask && (
        <Modal closeModal={closeTask}>
          <ViewTaskModal task={task} users={data} columnId={columnId} handleClose={closeTask} />
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
