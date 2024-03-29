import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../store/reducers/TaskDealerApi';
import { UpdateUserType } from '../../types/UsersTypes';
import styles from './UserProfile.module.css';
import ValidateError from '../../components/ValidateError';
import { useAppDispatch, useAppSelector } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';
import ConfirmModal from '../../components/ConfirmModal';

function UserProfile() {
  const intl = useIntl();
  const { userId } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const { changeUserLoginStatus, changeTokenStatus, changeToken } = userSlice.actions;
  const { data } = useGetUserByIdQuery(userId);
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserType>({
    mode: 'onBlur',
  });

  const edit = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const input = document.getElementById(id) as HTMLInputElement;
    const button = e.target as HTMLButtonElement;
    if (input.disabled && button.nextElementSibling) {
      input.disabled = false;
      input.focus();
      button.classList.add('hidden');
      button.nextElementSibling.classList.remove('hidden');
    } else {
      input.disabled = true;
      if (button.previousElementSibling) button.previousElementSibling.classList.remove('hidden');
      button.classList.add('hidden');
    }
  };

  const onSubmit = (dataForm: UpdateUserType) => {
    const sendData = dataForm;
    sendData.id = userId;
    updateUser(sendData)
      .unwrap()
      .then(() => toast.success(intl.formatMessage({ id: 'toast-updateUser-profile-success' })))
      .catch(() => toast.error(intl.formatMessage({ id: 'toast-updateUser-profile-error' })));
  };

  const openModal = () => {
    setPopupIsOpen(true);
  };

  const closeModal = () => {
    setPopupIsOpen(false);
  };

  const handleDeleteUser = () => {
    toast.promise(deleteUser(userId), {
      pending: `${intl.formatMessage({ id: 'toast-deleteUser-profile-pending' })}`,
      success: `${intl.formatMessage({ id: 'toast-deleteUser-profile-success' })} 👌`,
      error: `${intl.formatMessage({ id: 'toast-deleteUser-profile-error' })}`,
    });
    dispatch(changeUserLoginStatus(false));
    dispatch(changeTokenStatus(false));
    dispatch(changeToken(''));
    setPopupIsOpen(false);
  };

  useEffect(() => {
    if (data) {
      setValue('login', data.login);
      setValue('name', data.name);
    }
  }, [data, setValue]);
  return (
    <div className={styles.main__container}>
      {popupIsOpen && (
        <ConfirmModal closeConfirmModal={closeModal} handleBoardDelete={handleDeleteUser}>
          <FormattedMessage id="profile-delete-question" />
        </ConfirmModal>
      )}
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.form__title}>
          {`${intl.formatMessage({ id: 'profile-form-title' })}`}
        </h3>
        <div className={styles.list}>
          <label htmlFor="login">
            <b>
              <FormattedMessage id="auth-login-title" />
              {errors.login && <ValidateError message={errors.login.message} />}
            </b>
            <div className={styles.item}>
              <input
                {...register('login', {
                  required: `${intl.formatMessage({ id: 'auth-input-login' })}`,
                  minLength: {
                    value: 3,
                    message: `${intl.formatMessage({ id: 'auth-input-length' })}`,
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: `${intl.formatMessage({ id: 'auth-input-letters' })}`,
                  },
                })}
                className={styles.title}
                id="user-login"
                disabled
              />
              <div className={styles.icons}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={(e) => edit(e, 'user-login')}
                >
                  <i className="fa-solid fa-pen" />
                  <i className="fa-solid fa-check hidden" />
                </button>
              </div>
            </div>
          </label>
          <label htmlFor="name">
            <b>
              <FormattedMessage id="auth-name-title" />
              {errors.name && <ValidateError message={errors.name.message} />}
            </b>
            <div className={styles.item}>
              <input
                {...register('name', {
                  required: `${intl.formatMessage({ id: 'auth-input-name' })}`,
                  minLength: {
                    value: 3,
                    message: `${intl.formatMessage({ id: 'auth-input-length' })}`,
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: `${intl.formatMessage({ id: 'auth-input-letters' })}`,
                  },
                })}
                className={styles.title}
                id="user-name"
                disabled
              />
              <div className={styles.icons}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={(e) => edit(e, 'user-name')}
                >
                  <i className="fa-solid fa-pen" />
                  <i className="fa-solid fa-check hidden" />
                </button>
              </div>
            </div>
          </label>
          <label htmlFor="password">
            <b>
              <FormattedMessage id="auth-password-title" />
              {errors.password && <ValidateError message={errors.password.message} />}
            </b>
            <div className={styles.item}>
              <input
                {...register('password', {
                  required: `${intl.formatMessage({ id: 'auth-input-password' })}`,
                  minLength: {
                    value: 3,
                    message: `${intl.formatMessage({ id: 'auth-input-length' })}`,
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/i,
                    message: `${intl.formatMessage({ id: 'auth-input-letters' })}`,
                  },
                })}
                className={styles.title}
                id="user-password"
                disabled
                type="password"
              />
              <div className={styles.icons}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={(e) => edit(e, 'user-password')}
                >
                  <i className="fa-solid fa-pen" />
                  <i className="fa-solid fa-check hidden" />
                </button>
              </div>
            </div>
          </label>
        </div>
        <input
          type="submit"
          className={styles.button__submit}
          value={`${intl.formatMessage({ id: 'auth-input-submit' })}`}
        />
      </form>
      <input
        type="button"
        className={styles.delete__btn_main}
        value={`${intl.formatMessage({ id: 'profile-delete-btn' })}`}
        onClick={openModal}
      />
    </div>
  );
}

export default UserProfile;
