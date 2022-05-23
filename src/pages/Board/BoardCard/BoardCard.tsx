import React from 'react';
import styles from './BoardCard.module.css';
import BoardCardTitle from './BoardCardTitle/BoardCardTitle';

type BoardCardPropsType = {
  columnName: string;
  columnId: string;
};

function BoardCard({ columnName, columnId }: BoardCardPropsType) {
  return (
    <div className={styles.cardContainer}>
      <BoardCardTitle columnName={columnName} columnId={columnId} />
      <div className={styles.taskContainer}>{columnId}</div>
    </div>
  );
}

export default BoardCard;
