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

  const title = intl.formatMessage({ id: 'board-form-title-required' });
  const description = intl.formatMessage({ id: 'board-form-description-required' });
  const titleMessage = intl.formatMessage({ id: 'board-form-title-message' });
  const descriptionMessage = intl.formatMessage({ id: 'board-form-description-message' });

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
        <FormattedMessage id="board-form-create" />
      </button>
    </form>
  );
}

export default CreateBoard;
