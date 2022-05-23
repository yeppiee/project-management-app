import React from 'react';
import { CreateColumnResponseType } from '../../../Types/BoardTypes';
import styles from './BoardCard.module.css';
import BoardCardTitle from './BoardCardTitle/BoardCardTitle';

type BoardCardPropsType = {
  column: CreateColumnResponseType;
};

function BoardCard({ column }: BoardCardPropsType) {
  return (
    <div className={styles.cardContainer}>
      <BoardCardTitle column={column} />
      <div className={styles.taskContainer}>columnId</div>
    </div>
  );
}

export default BoardCard;
