/* import { useParams } from 'react-router-dom'; */
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from './Board.module.css';

function Board() {
  const navigate = useNavigate();
  const onClickNavigate = () => navigate(-1);
  /*  const { id } = useParams(); */
  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <button type="button" className={styles.headerButton} onClick={onClickNavigate}>
          <FormattedMessage id="board-back" />
        </button>
      </div>
      <div className={styles.boardsContainer}>
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
