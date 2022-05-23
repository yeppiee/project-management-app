import React from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useCreateColumnMutation, useGetBoardQuery } from '../../../store/reducers/TaskDealerApi';
import styles from './ColumnModal.module.css';

type FormDataType = {
  title: string;
};
type ColumnModalPropsType = {
  boardId: string;
  handleCancel: () => void;
};

function ColumnModal({ boardId, handleCancel }: ColumnModalPropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>();
  const intl = useIntl();
  const [createColumn] = useCreateColumnMutation();
  const { refetch } = useGetBoardQuery(boardId);
  const onSubmit = async ({ title }: FormDataType) => {
    await createColumn({ boardId, title });
    refetch();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <p className={styles.title}>
        <FormattedMessage id="modal-create-column-title" />
      </p>
      <div>
        <input
          className={errors?.title ? `${styles.error} ${styles.input} ` : styles.input}
          placeholder={intl.formatMessage({ id: 'modal-create-column-input-placeholder' })}
          type="text"
          {...register('title', {
            required: intl.formatMessage({ id: 'modal-create-title-required' }),
          })}
        />
        {errors?.title && <p className={styles.error}>{errors.title.message}</p>}
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

export default ColumnModal;
