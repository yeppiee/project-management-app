/* import { useParams } from 'react-router-dom'; */
import { FormattedMessage } from 'react-intl';
import styles from './Board.module.css';
import BoardCard from './BoardCard/BoardCard';
import BoardHeader from './BoardHeader/BoardHeader';

function Board() {
  /*  const { id } = useParams(); */
  return (
    <div className={styles.board}>
      <BoardHeader />
      <div className={styles.boardsContainer}>
        <BoardCard />
        <button type="button" className={styles.buttonCreateColumn}>
          <span className={styles.plus} />
          <p>
            <FormattedMessage id="board-add-column" />
          </p>
        </button>
      </div>
    </div>
  );
}

export default Board;
