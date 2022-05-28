import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { CreateColumnResponseType } from '../../../types/BoardTypes';
import styles from './BoardCard.module.css';
import BoardCardTitle from './BoardCardTitle/BoardCardTitle';
import Task from './Task/Task';
// sdfsdfsdfsdf
type BoardCardPropsType = {
  column: CreateColumnResponseType;
  index: number;
};

function BoardCard({ column, index }: BoardCardPropsType) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.cardContainer}
        >
          <BoardCardTitle column={column} />
          <Task column={column} />
        </div>
      )}
    </Draggable>
  );
}

export default BoardCard;
