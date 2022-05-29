import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from './BoardHeader.module.css';

type BoardHeaderType = {
  boardName: string;
};

function BoardHeader({ boardName }: BoardHeaderType) {
  const navigate = useNavigate();
  const onClickNavigate = () => navigate(-1);
  return (
    <div className={styles.header}>
      <button type="button" className={styles.headerButton} onClick={onClickNavigate}>
        <FormattedMessage id="board-back" />
      </button>
      <p className={styles.boardName}>{boardName}</p>
    </div>
  );
}

export default BoardHeader;
