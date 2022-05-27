import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useUpdateTaskMutation } from '../../../../../store/reducers/TaskDealerApi';
import { TaskResponse, UsersDataType } from '../../../../../Types/BoardTypes';
import styles from './ViewTaskModal.module.css';

type ViewTaskModalPropsType = {
  task: TaskResponse;
  handleClose: () => void;
  users: UsersDataType[];
  columnId: string;
};

function ViewTaskModal({ task, handleClose, users, columnId }: ViewTaskModalPropsType) {
  const { id: boardId } = useParams();
  const [updateTask] = useUpdateTaskMutation();
  const [isEditTitle, setIseEditTitle] = useState(false);
  const [isEditDescription, setIseEditDescription] = useState(false);
  const [isEditAssignee, setIseEditAssignee] = useState(false);
  const [titleValue, setTitleValue] = useState(task.title);
  const [descriptionValue, setDescriptionValue] = useState(task.description);
  const [assigneeValue, setAssigneeValue] = useState(task.userId);
  const changeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleValue(e.target.value);
  const changeDescriptionValue = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescriptionValue(e.target.value);
  const changeAssigneeValue = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAssigneeValue(e.target.value);
  const handleEditTitle = () => setIseEditTitle(true);
  const cancelEditTitle = () => setIseEditTitle(false);
  const handleEditDescriptoin = () => setIseEditDescription(true);
  const cancelEditDescriptoin = () => setIseEditDescription(false);
  const handleEditAssignee = () => setIseEditAssignee(true);
  const cancelEditAssignee = () => setIseEditAssignee(false);
  const updateTitle = async () => {
    await updateTask({ ...task, columnId, boardId, title: titleValue });
    setIseEditTitle(false);
  };
  const updateDescription = async () => {
    await updateTask({ ...task, columnId, boardId, description: descriptionValue });
    setIseEditDescription(false);
  };
  const updateAssignee = async () => {
    await updateTask({ ...task, columnId, boardId, userId: assigneeValue });
    setIseEditAssignee(false);
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.controls}>
          <p className={styles.titles}>
            <FormattedMessage id="view-task-title" />
          </p>
          <span
            role="button"
            aria-label="edit-title"
            tabIndex={0}
            onClick={handleEditTitle}
            className={styles.buttonEdit}
          />
        </div>
        {!isEditTitle ? (
          <p>{task.title}</p>
        ) : (
          <div className={styles.titleContainer}>
            <button
              type="button"
              aria-label="submit-edit-title"
              tabIndex={-1}
              className={styles.submit}
              onClick={updateTitle}
            />
            <button
              type="button"
              aria-label="cancel-button"
              className={styles.cancel}
              onClick={cancelEditTitle}
            />
            <input
              className={styles.input}
              onChange={changeTitleValue}
              type="text"
              value={titleValue}
            />
          </div>
        )}
      </div>
      <div>
        <div className={styles.controls}>
          <p className={styles.titles}>
            <FormattedMessage id="view-task-description" />
          </p>
          <span
            role="button"
            aria-label="edit-description"
            tabIndex={0}
            onClick={handleEditDescriptoin}
            className={styles.buttonEdit}
          />
        </div>
        {!isEditDescription ? (
          <p>{task.description}</p>
        ) : (
          <div className={styles.titleContainer}>
            <button
              type="button"
              aria-label="submit-edit-description"
              tabIndex={-1}
              className={styles.submit}
              onClick={updateDescription}
            />
            <button
              type="button"
              aria-label="cancel-button"
              className={styles.cancel}
              onClick={cancelEditDescriptoin}
            />
            <textarea
              value={descriptionValue}
              onChange={changeDescriptionValue}
              className={styles.input}
              rows={2}
            />
          </div>
        )}
      </div>
      <div>
        <div className={styles.controls}>
          <p className={styles.titles}>
            {' '}
            <FormattedMessage id="view-task-assignee" />
          </p>
          <span
            role="button"
            aria-label="edit-assignee"
            tabIndex={0}
            onClick={handleEditAssignee}
            className={styles.buttonEdit}
          />
        </div>
        {!isEditAssignee ? (
          <p>{users[users.findIndex((user) => user.id === task.userId)].name}</p>
        ) : (
          <div className={styles.titleContainer}>
            <button
              type="button"
              aria-label="submit-edit-assignee"
              tabIndex={-1}
              className={styles.submit}
              onClick={updateAssignee}
            />
            <button
              type="button"
              aria-label="cancel-button"
              className={styles.cancel}
              onClick={cancelEditAssignee}
            />
            <select
              className={styles.input}
              value={assigneeValue}
              onChange={changeAssigneeValue}
              /*  defaultValue={task.userId} */
            >
              {users?.length > 0 &&
                users.map((user: UsersDataType) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
            </select>
          </div>
        )}
      </div>

      <span
        role="button"
        tabIndex={0}
        aria-label="close-modal"
        onClick={handleClose}
        className={styles.delete}
      />
    </div>
  );
}

export default ViewTaskModal;
