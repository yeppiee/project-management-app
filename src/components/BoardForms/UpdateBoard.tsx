import { SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
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
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Enter 3 to 20 characters',
            },
            maxLength: {
              value: 20,
              message: 'Enter 3 to 20 characters',
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
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Enter 10 to 200 characters',
            },
            maxLength: {
              value: 200,
              message: 'Enter 10 to 200 characters',
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
