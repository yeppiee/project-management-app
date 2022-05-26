import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateBoardMutation } from '../../store/reducers/TaskDealerApi';
import { CreateBoardType } from '../../types/BoardsTypes';
import ValidateError from './ValidateError';
import styles from './CreateBoard.module.css';

function CreateBoard() {
  const [createBoard] = useCreateBoardMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBoardType>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<CreateBoardType> = (data) => {
    createBoard(data);
    reset();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">
        <p>
          Title:
          {errors.title && <ValidateError message={errors.title.message} />}
        </p>
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
        <p>
          Description:
          {errors.description && <ValidateError message={errors.description.message} />}
        </p>
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
        Create Board
      </button>
    </form>
  );
}

export default CreateBoard;
