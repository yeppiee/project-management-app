import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
/* import { useParams } from 'react-router-dom'; */
import Modal from '../../components/Modal/Modal';
import { useGetBoardQuery } from '../../store/reducers/TaskDealerApi';
import { CreateColumnResponseType } from '../../Types/BoardTypes';
import styles from './Board.module.css';
import BoardCard from './BoardCard/BoardCard';
import BoardHeader from './BoardHeader/BoardHeader';
import ColumnModal from './ColumnModal/ColumnModal';

function Board() {
  const id = 'd805103c-e065-4b53-9312-2385b65f834a';
  const [dataCopy, setDataCopy] = useState([]);
  const { data } = useGetBoardQuery(id);
  const [isOpenModal, setOpenModal] = useState(false);
  const handleCancelModal = () => setOpenModal(false);
  const openModal = () => setOpenModal(true);

  useEffect(() => {
    if (data) setDataCopy(data.columns.slice());
  }, [data]);

  return (
    <div className={styles.board}>
      <BoardHeader boardName={data.title} />
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
      {isOpenModal && (
        <Modal closeModal={() => setOpenModal(false)}>
          <ColumnModal handleCancel={handleCancelModal} boardId={id as string} />
        </Modal>
      )}
    </div>
  );
}

export default Board;
