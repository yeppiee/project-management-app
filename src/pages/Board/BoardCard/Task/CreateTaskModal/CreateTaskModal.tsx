import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useCreateTaskMutation,
  useGetAllUsersQuery,
  useGetBoardQuery,
} from '../../../../../store/reducers/TaskDealerApi';
import { CreateColumnResponseType, UsersDataType } from '../../../../../Types/BoardTypes';
import styles from './CreateTaskModal.module.css';

type FormDataType = {
  title: string;
  description: string;
  userId: string;
};
type TaskModalPropsType = {
  boardId: string;
  handleCancel: () => void;
  column: CreateColumnResponseType;
};

function CreateTaskModal({ boardId, handleCancel, column: { id } }: TaskModalPropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();
  const { data: users } = useGetAllUsersQuery(id);
  const intl = useIntl();
  const [createTask] = useCreateTaskMutation();
  const { refetch } = useGetBoardQuery(boardId);
  const onSubmit = async ({ title, description, userId }: FormDataType) => {
    await createTask({ boardId, title, userId, description, columnId: id });
    refetch();
    handleCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <p className={styles.title}>
        <FormattedMessage id="modal-create-task-title" />
      </p>
      <div>
        <input
          className={errors?.title ? `${styles.error} ${styles.input} ` : styles.input}
          placeholder={intl.formatMessage({ id: 'modal-create-task-title-placeholder' })}
          type="text"
          {...register('title', {
            required: intl.formatMessage({ id: 'modal-create-task-title-required' }),
          })}
        />
        {errors?.title && <p className={styles.error}>{errors.title.message}</p>}
      </div>
      <div>
        <textarea
          min-rows={3}
          className={errors?.description ? `${styles.error} ${styles.input} ` : styles.input}
          placeholder={intl.formatMessage({ id: 'modal-create-task-description-placeholder' })}
          {...register('description', {
            required: intl.formatMessage({ id: 'modal-create-task-description-required' }),
          })}
        />
        {errors?.description && <p className={styles.error}>{errors.description.message}</p>}
      </div>
      <div>
        <select
          className={styles.select}
          defaultValue=""
          {...register('userId', {
            required: intl.formatMessage({ id: 'modal-create-task-userId-required' }),
          })}
        >
          <option value="" disabled>
            <FormattedMessage id="modal-create-task-assignee" />
          </option>
          {users?.length > 0 &&
            users.map((user: UsersDataType) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
        </select>
        {errors?.userId && <p className={styles.error}>{errors.userId.message}</p>}
      </div>
      <div className={styles.controls}>
        <button className={styles.button} onClick={handleCancel} type="button">
          <FormattedMessage id="modal-create-column-cancel" />
        </button>
        <button className={styles.button} type="submit">
          <FormattedMessage id="modal-create-column-create" />
        </button>
      </div>
    </form>
  );
}

export default CreateTaskModal;
