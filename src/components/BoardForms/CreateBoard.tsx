import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useCreateBoardMutation } from '../../store/reducers/TaskDealerApi';
import { CreateBoardType } from '../../types/BoardsTypes';
import ValidateError from './ValidateError';
import styles from './BoardForms.module.css';

type Props = {
  closeModal: () => void;
};

function CreateBoard({ closeModal }: Props) {
  const [createBoard] = useCreateBoardMutation();
  const navigate = useNavigate();

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
    navigate('/');
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
        <FormattedMessage id="board-form-create" />
      </button>
    </form>
  );
}

export default CreateBoard;
