import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import Loader from '../../Loader';
import {
  useGetBoardQuery,
  useUpdateColumnMutation,
  useUpdateTaskAndColumnMutation,
  useUpdateTaskMutation,
} from '../../store/reducers/TaskDealerApi';
import { CreateColumnResponseType, CreateTaskType } from '../../types/BoardTypes';
import styles from './Board.module.css';
import BoardCard from './BoardCard/BoardCard';
import BoardHeader from './BoardHeader/BoardHeader';
import ColumnModal from './ColumnModal/ColumnModal';

function Board() {
  const { id } = useParams();
  const [updateTask] = useUpdateTaskMutation();
  const [updateTaskAndColumn] = useUpdateTaskAndColumnMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [dataCopy, setDataCopy] = useState<CreateColumnResponseType[]>([]);
  const { data } = useGetBoardQuery(id);
  const [isOpenModal, setOpenModal] = useState(false);
  const handleCancelModal = () => setOpenModal(false);
  const openModal = () => setOpenModal(true);
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      const draggableColumn = data.columns.find(
        (column: CreateColumnResponseType) => column.id === draggableId
      );
      const copy = JSON.parse(JSON.stringify(dataCopy)) as CreateColumnResponseType[];
      const sortedColumns = copy.sort((a, b) => a.order - b.order);
      sortedColumns.splice(source.index - 1, 1);
      sortedColumns.splice(destination.index - 1, 0, draggableColumn);
      const resultColumns = sortedColumns.map((column, index) => ({ ...column, order: index + 1 }));
      setDataCopy(resultColumns);

      updateColumn({
        boardId: id as string,
        columnId: draggableId,
        order: destination.index,
        title: draggableColumn.title,
      });
    }
    if (destination.droppableId === source.droppableId && type === 'task') {
      const draggableTask = data.columns
        .find((column: CreateColumnResponseType) => column.id === source.droppableId)
        .tasks.find((task: CreateTaskType) => task.id === draggableId);

      const copy = JSON.parse(JSON.stringify(dataCopy));
      const targetColumn = copy.find(
        (column: CreateColumnResponseType) => column.id === source.droppableId
      ) as unknown as CreateColumnResponseType;
      const sortedTasks = targetColumn.tasks.sort((a, b) => a.order - b.order);
      sortedTasks.splice(source.index - 1, 1);
      sortedTasks.splice(destination.index - 1, 0, draggableTask);
      const resultTasks = sortedTasks.map((task, index) => ({ ...task, order: index + 1 }));
      const resultColumn = { ...targetColumn, tasks: resultTasks };
      copy.splice(targetColumn.order - 1, 1, resultColumn);
      setDataCopy(copy);

      await updateTask({
        ...draggableTask,
        boardId: id,
        columnId: destination.droppableId,
        order: destination.index,
      });
    }
    if (destination.droppableId !== source.droppableId && type === 'task') {
      const draggableTask = data.columns
        .find((column: CreateColumnResponseType) => column.id === source.droppableId)
        .tasks.find((task: CreateTaskType) => task.id === draggableId);

      const copy = JSON.parse(JSON.stringify(dataCopy));
      const currentColumn = copy.find(
        (column: CreateColumnResponseType) => column.id === source.droppableId
      ) as CreateColumnResponseType;
      const dropColumn = copy.find(
        (column: CreateColumnResponseType) => column.id === destination.droppableId
      ) as CreateColumnResponseType;
      const currentColumnTasks = currentColumn.tasks.sort((a, b) => a.order - b.order);
      const dropColumnTasks = dropColumn.tasks.sort((a, b) => a.order - b.order);
      if (dropColumnTasks.length === 0) {
        dropColumnTasks.push(draggableTask);
      } else {
        dropColumnTasks.splice(destination.index - 1, 0, draggableTask);
      }

      currentColumnTasks.splice(source.index - 1, 1);

      const resultCurrentColumnTasks = currentColumnTasks.map((task, index) => ({
        ...task,
        order: index + 1,
      }));
      const resultCurrentColumn = { ...currentColumn, tasks: resultCurrentColumnTasks };
      const resultDropColumnTasks = dropColumnTasks.map((task, index) => ({
        ...task,
        order: index + 1,
      }));
      const resultDropColumn = { ...dropColumn, tasks: resultDropColumnTasks };
      copy.splice(resultCurrentColumn.order - 1, 1, resultCurrentColumn);
      copy.splice(resultDropColumn.order - 1, 1, resultDropColumn);
      setDataCopy(copy);

      await updateTaskAndColumn({
        ...draggableTask,
        boardId: id,
        column: source.droppableId,
        columnId: destination.droppableId,
        order: destination.index === 0 ? 1 : destination.index,
        id: draggableTask.id,
      });
    }
  };

  useEffect(() => {
    if (data) setDataCopy(data.columns.slice());
  }, [data]);

  return !data ? (
    <Loader />
  ) : (
    <div className={styles.board}>
      <BoardHeader boardName={data.title} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id as string} direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.boardsContainer}
            >
              {dataCopy.length > 0 &&
                dataCopy
                  .sort(
                    (a: CreateColumnResponseType, b: CreateColumnResponseType) => a.order - b.order
                  )
                  .map((column: CreateColumnResponseType, index) => {
                    return <BoardCard column={column} index={index + 1} key={column.id} />;
                  })}
              {provided.placeholder}
              <button type="button" onClick={openModal} className={styles.buttonCreateColumn}>
                <span className={styles.plus} />
                <p>
                  <FormattedMessage id="board-add-column" />
                </p>
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {isOpenModal && (
        <Modal closeModal={() => setOpenModal(false)}>
          <ColumnModal handleCancel={handleCancelModal} boardId={id as string} />
        </Modal>
      )}
    </div>
  );
}

export default Board;
