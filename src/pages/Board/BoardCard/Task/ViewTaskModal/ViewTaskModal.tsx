import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateTaskMutation } from '../../../../../store/reducers/TaskDealerApi';
import { TaskResponse, UsersDataType } from '../../../../../types/BoardTypes';
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
  const intl = useIntl();

  const changeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleValue(e.target.value);
  const changeDescriptionValue = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescriptionValue(e.target.value);
  const changeAssigneeValue = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setAssigneeValue(e.target.value);
  const handleEditTitle = () => setIseEditTitle(true);
  const cancelEditTitle = () => {
    setIseEditTitle(false);
    setTitleValue(task.title);
  };
  const handleEditDescriptoin = () => setIseEditDescription(true);
  const cancelEditDescriptoin = () => {
    setIseEditDescription(false);
    setDescriptionValue(task.description);
  };
  const handleEditAssignee = () => setIseEditAssignee(true);
  const cancelEditAssignee = () => {
    setIseEditAssignee(false);
    setAssigneeValue(task.userId);
  };
  const updateTitle = () => {
    if (titleValue.length === 0) {
      return null;
    }
    updateTask({ ...task, columnId, boardId, title: titleValue })
      .unwrap()
      .then(() => toast.success(intl.formatMessage({ id: 'toast-renameTitle-board-success' })))
      .catch(() => toast.error(intl.formatMessage({ id: 'toast-renameTitle-board-error' })));
    return setIseEditTitle(false);
  };
  const updateDescription = () => {
    if (descriptionValue.length === 0) {
      return null;
    }
    updateTask({ ...task, columnId, boardId, description: descriptionValue })
      .unwrap()
      .then(() =>
        toast.success(intl.formatMessage({ id: 'toast-renameDescription-board-success' }))
      )
      .catch(() => toast.error(intl.formatMessage({ id: 'toast-renameDescription-board-error' })));
    return setIseEditDescription(false);
  };
  const updateAssignee = () => {
    updateTask({ ...task, columnId, boardId, userId: assigneeValue })
      .unwrap()
      .then(() => toast.success(intl.formatMessage({ id: 'toast-renameAssignee-board-success' })))
      .catch(() => toast.error(intl.formatMessage({ id: 'toast-renameAssignee-board-error' })));
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
            <select className={styles.input} value={assigneeValue} onChange={changeAssigneeValue}>
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
