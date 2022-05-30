import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import Modal from '../../../../components/Modal/Modal';
import { CreateColumnResponseType, TaskResponse } from '../../../../types/BoardTypes';
import styles from './Task.module.css';
import TaskContent from './TaskContent/TaskContent';
import CreateTaskModal from './CreateTaskModal/CreateTaskModal';

type TaskPropsType = {
  column: CreateColumnResponseType;
};

function Task({ column }: TaskPropsType) {
  const { id: boardId } = useParams();
  const [isOpenModal, setOpenModal] = useState(false);
  const columnArray = [...column.tasks];
  const handleCancelModal = () => setOpenModal(false);
  const handleCreateTask = () => setOpenModal(true);

  return (
    <>
      <Droppable droppableId={column.id} type="task">
        {(provided) => (
          <div
            className={styles.taskContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columnArray.length > 0 &&
              columnArray
                .sort((a: TaskResponse, b: TaskResponse) => a.order - b.order)
                .map((task, index) => {
                  return (
                    <TaskContent task={task} key={task.id} index={index + 1} columnId={column.id} />
                  );
                })}
            {provided.placeholder}
            <button type="button" onClick={handleCreateTask} className={styles.buttonAddTask}>
              <span className={styles.plus} />
              <p>
                <FormattedMessage id="task-button-create-task" />
              </p>
            </button>
          </div>
        )}
      </Droppable>
      {isOpenModal && (
        <Modal closeModal={handleCancelModal}>
          <CreateTaskModal
            boardId={boardId as string}
            column={column}
            handleCancel={handleCancelModal}
          />
        </Modal>
      )}
    </>
  );
}

export default Task;
