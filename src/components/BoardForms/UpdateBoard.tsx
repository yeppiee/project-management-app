import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useUpdateBoardMutation } from '../../store/reducers/TaskDealerApi';
import { Board } from '../../types/BoardsTypes';
import ValidateError from '../ValidateError';
import styles from './BoardForms.module.css';
import { useAppSelector } from '../../customHooks/redux';

type Props = {
  closeModal: () => void;
};

function UpdateBoard({ closeModal }: Props) {
  const { updateData } = useAppSelector((state) => state.boardFormSlice);
  const [updateBoard] = useUpdateBoardMutation();
  const intl = useIntl();

  const title = intl.formatMessage({ id: 'board-form-title-required' });
  const description = intl.formatMessage({ id: 'board-form-description-required' });
  const titleMessage = intl.formatMessage({ id: 'board-form-title-message' });
  const descriptionMessage = intl.formatMessage({ id: 'board-form-description-message' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Board>({
    mode: 'onBlur',
    defaultValues: {
      title: updateData && updateData.title,
      description: updateData && updateData.description,
    },
  });

  const onSubmit: SubmitHandler<Board> = (data) => {
    const { id } = updateData;
    const newData = { ...data, id };
    toast.promise(updateBoard(newData), {
      pending: `${intl.formatMessage({ id: 'toast-updateBoard-form-pending' })}`,
      success: `${intl.formatMessage({ id: 'toast-updateBoard-form-success' })} 👌`,
      error: `${intl.formatMessage({ id: 'toast-updateBoard-form-error' })}`,
    });
    reset();
    closeModal();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">
        <b>
          <FormattedMessage id="board-form-title" />
          {errors.title && <ValidateError message={errors.title.message} />}
        </b>
        <input
          {...register('title', {
            required: title,
            minLength: {
              value: 3,
              message: titleMessage,
            },
            maxLength: {
              value: 20,
              message: titleMessage,
            },
          })}
          className={styles.text}
        />
      </label>
      <label htmlFor="description">
        <b>
          <FormattedMessage id="board-form-description" />
          {errors.description && <ValidateError message={errors.description.message} />}
        </b>
        <textarea
          {...register('description', {
            required: description,
            minLength: {
              value: 10,
              message: descriptionMessage,
            },
            maxLength: {
              value: 200,
              message: descriptionMessage,
            },
          })}
          className={styles.text}
          rows={8}
        />
      </label>
      <button type="submit" className={styles.button}>
        <FormattedMessage id="board-form-update" />
      </button>
    </form>
  );
}

export default UpdateBoard;
