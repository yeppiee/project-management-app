import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useUpdateBoardMutation } from '../../store/reducers/TaskDealerApi';
import { Board } from '../../types/BoardsTypes';
import ValidateError from './ValidateError';
import styles from './BoardForms.module.css';
import { useAppSelector } from '../../customHooks/redux';

type Props = {
  closeModal: () => void;
};

function UpdateBoard({ closeModal }: Props) {
  const { updateData } = useAppSelector((state) => state.boardFormSlice);
  const [updateBoard] = useUpdateBoardMutation();
  const intl = useIntl();

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
    updateBoard(newData);
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
            required: intl.formatMessage({ id: 'board-form-title-required' }),
            minLength: {
              value: 3,
              message: intl.formatMessage({ id: 'board-form-title-message' }),
            },
            maxLength: {
              value: 20,
              message: intl.formatMessage({ id: 'board-form-title-message' }),
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
            required: intl.formatMessage({ id: 'board-form-description-required' }),
            minLength: {
              value: 10,
              message: intl.formatMessage({ id: 'board-form-description-message' }),
            },
            maxLength: {
              value: 200,
              message: intl.formatMessage({ id: 'board-form-description-message' }),
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
