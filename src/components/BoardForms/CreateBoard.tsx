import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
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
  const intl = useIntl();

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
              message: intl.formatMessage({ id: 'board-form-title-message' }),
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
