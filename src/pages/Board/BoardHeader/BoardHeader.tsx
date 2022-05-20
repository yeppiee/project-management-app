import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from './BoardHeader.module.css';

function BoardHeader() {
  const navigate = useNavigate();
  const onClickNavigate = () => navigate(-1);
  return (
    <div className={styles.header}>
      <button type="button" className={styles.headerButton} onClick={onClickNavigate}>
        <FormattedMessage id="board-back" />
      </button>
    </div>
  );
}

export default BoardHeader;
