import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateBoardMutation } from '../../store/reducers/TaskDealerApi';
import { CreateBoardType } from '../../types/BoardsTypes';
import ValidateError from './ValidateError';
import styles from './BoardForms.module.css';

type Props = {
  closeModal: () => void;
};

function CreateBoard({ closeModal }: Props) {
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
    closeModal();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">
        <b>
          Title:
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
          Description:
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
        Create Board
      </button>
    </form>
  );
}

export default CreateBoard;
