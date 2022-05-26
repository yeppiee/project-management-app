import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';
/* import { useParams } from 'react-router-dom'; */
import Modal from '../../components/Modal/Modal';
import { useGetBoardQuery, useUpdateTaskMutation } from '../../store/reducers/TaskDealerApi';
import { CreateColumnResponseType, CreateTaskType } from '../../Types/BoardTypes';
import styles from './Board.module.css';
import BoardCard from './BoardCard/BoardCard';
import BoardHeader from './BoardHeader/BoardHeader';
import ColumnModal from './ColumnModal/ColumnModal';

function Board() {
  const id = '8ccf95fc-8e38-4aef-855c-f5986f093b08';
  const [updateTask] = useUpdateTaskMutation();
  const [dataCopy, setDataCopy] = useState([]);
  const { data, refetch } = useGetBoardQuery(id);
  const [isOpenModal, setOpenModal] = useState(false);
  const handleCancelModal = () => setOpenModal(false);
  const openModal = () => setOpenModal(true);
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const draggableTask = data.columns
      .find((column: CreateColumnResponseType) => column.id === source.droppableId)
      .tasks.find((task: CreateTaskType) => task.id === draggableId);
    await updateTask({
      ...draggableTask,
      boardId: id,
      columnId: destination.droppableId,
      order: destination.index,
    });
    refetch();
  };

  useEffect(() => {
    if (data) setDataCopy(data.columns.slice());
  }, [data]);
  if (!data) {
    return <div>Board not found</div>;
  }
  return (
    <div className={styles.board}>
      <BoardHeader boardName={data.title} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.boardsContainer}>
          {dataCopy.length > 0 &&
            dataCopy
              .sort((a: CreateColumnResponseType, b: CreateColumnResponseType) => a.order - b.order)
              .map((column: CreateColumnResponseType) => {
                return <BoardCard column={column} key={column.id} />;
              })}

          <button type="button" onClick={openModal} className={styles.buttonCreateColumn}>
            <span className={styles.plus} />
            <p>
              <FormattedMessage id="board-add-column" />
            </p>
          </button>
        </div>
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
