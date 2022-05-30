import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import {
  useCreateTaskMutation,
  useGetAllUsersQuery,
} from '../../../../../store/reducers/TaskDealerApi';
import { FormDataType, TaskModalPropsType, UsersDataType } from '../../../../../types/BoardTypes';
import styles from './CreateTaskModal.module.css';

function CreateTaskModal({ boardId, handleCancel, column: { id } }: TaskModalPropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();
  const { data: users } = useGetAllUsersQuery(id);
  const intl = useIntl();
  const [createTask] = useCreateTaskMutation();
  const onSubmit = ({ title, description, userId }: FormDataType) => {
    toast.promise(createTask({ boardId, title, userId, description, columnId: id }), {
      pending: `${intl.formatMessage({ id: 'toast-createTask-board-pending' })}`,
      success: `${intl.formatMessage({ id: 'toast-createTask-board-success' })} 👌`,
      error: `${intl.formatMessage({ id: 'toast-createTask-board-error' })}`,
    });
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
