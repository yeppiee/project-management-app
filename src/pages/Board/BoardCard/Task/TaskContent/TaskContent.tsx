import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../../../../../components/Modal/Modal';
import {
  useDeleteTaskMutation,
  useGetAllUsersQuery,
} from '../../../../../store/reducers/TaskDealerApi';
import { TaskResponse } from '../../../../../types/BoardTypes';
import ViewTaskModal from '../ViewTaskModal/ViewTaskModal';
import styles from './TaskContent.module.css';
import ConfirmModal from '../../../../../components/ConfirmModal';

type TaskContentPropsType = {
  task: TaskResponse;
  columnId: string;
  index: number;
};

function TaskContent({ task, columnId, index }: TaskContentPropsType) {
  const { id: boardId } = useParams();
  const { data } = useGetAllUsersQuery(boardId);
  const [deleteTask] = useDeleteTaskMutation();
  const [viewConfirmModal, setViewConfirmModal] = useState(false);
  const [viewTask, setViewTask] = useState(false);
  const intl = useIntl();
  const viewDeleteModal = () => setViewConfirmModal(true);
  const closeModal = () => {
    setViewConfirmModal(false);
  };
  const handleDeletetask = ({ id }: TaskResponse) => {
    deleteTask({ boardId, columnId, taskId: id })
      .unwrap()
      .then(() => toast.success(intl.formatMessage({ id: 'toast-deleteTask-board-success' })))
      .catch(() => toast.error(intl.formatMessage({ id: 'toast-deleteTask-board-error' })));
  };
  const openTask = () => setViewTask(true);
  const closeTask = () => setViewTask(false);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            className={snapshot.isDragging ? `${styles.dragged} ${styles.task}` : `${styles.task}`}
            key={task.id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
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
        <ConfirmModal
          closeConfirmModal={closeModal}
          handleBoardDelete={() => handleDeletetask(task)}
        >
          <FormattedMessage id="modal-delete-task-title" />
        </ConfirmModal>
      )}
    </>
  );
}

export default TaskContent;
