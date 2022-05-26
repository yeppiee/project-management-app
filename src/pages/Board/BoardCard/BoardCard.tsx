import React from 'react';

import { CreateColumnResponseType } from '../../../Types/BoardTypes';
import styles from './BoardCard.module.css';
import BoardCardTitle from './BoardCardTitle/BoardCardTitle';
import Task from './Task/Task';

type BoardCardPropsType = {
  column: CreateColumnResponseType;
};

function BoardCard({ column }: BoardCardPropsType) {
  return (
    <div className={styles.cardContainer}>
      <BoardCardTitle column={column} />
      <Task column={column} />
    </div>
  );
}

export default BoardCard;
