import { useState } from 'react';
import { Buffer } from 'buffer';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAppDispatch } from '../../customHooks/redux';
import { useSignInMutation, useSignUpMutation } from '../../store/reducers/TaskDealerApi';
import { userSlice } from '../../store/reducers/UserSlice';
import { AuthDataType, AuthPropsType, ResTokenType, SignInDataType } from '../../types/AuthTypes';
import styles from './Authorization.module.css';
import ValidateError from '../ValidateError';

function Authorization({ type }: AuthPropsType) {
  const { changeUserLoginStatus, changeTokenStatus, changeToken, changeUserId, changeTimeToken } =
    userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [signIn, { isError }] = useSignInMutation();
  const [errorMessage, setErrorMessage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDataType>({
    mode: 'onBlur',
  });
  const intl = useIntl();

  const getId = (res: ResTokenType) => {
    const buf = Buffer.from(res.token.split('.')[1], 'base64');
    const id = JSON.parse(buf.toString('utf8')).userId;
    const time = JSON.parse(buf.toString('utf8')).iat;
    dispatch(changeUserId(id));
    dispatch(changeTimeToken(time));
  };

  const singInFunc = async (data: SignInDataType) => {
    await signIn({ login: data.login, password: data.password })
      .unwrap()
      .then(
        (res: ResTokenType) => {
          if (!isError) {
            dispatch(changeUserLoginStatus(true));
            dispatch(changeTokenStatus(true));
            dispatch(changeToken(res.token));
            getId(res);
            navigate('/');
          }
        },
        (error) => {
          setErrorMessage(error.data.message);
        }
      );
  };
  const onSubmitUp = async (data: AuthDataType) => {
    await signUp(data).then(
      () => {
        singInFunc(data);
      },
      (error) => {
        setErrorMessage(error.data.message);
      }
    );
  };
  const onSubmitIn = async (data: SignInDataType) => {
    singInFunc(data);
  };

  const signInJsx = (
    <>
      <label htmlFor="login">
        <b>
          <FormattedMessage id="auth-login-title" />
          {errors.login && <ValidateError message={errors.login.message} />}
        </b>
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
          type="text"
          className={styles.text}
          placeholder={`${intl.formatMessage({ id: 'auth-input-login' })}`}
        />
      </label>
      <label htmlFor="password">
        <b>
          <FormattedMessage id="auth-password-title" />
          {errors.password && <ValidateError message={errors.password.message} />}
        </b>
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
          type="password"
          className={styles.text}
          placeholder={`${intl.formatMessage({ id: 'auth-input-password' })}`}
        />
      </label>
      <input
        type="submit"
        className={styles.button}
        value={`${intl.formatMessage({ id: 'auth-input-submit' })}`}
      />
    </>
  );
  return type === 'SignUp' ? (
    <form onSubmit={handleSubmit(onSubmitUp)} className={styles.container}>
      <p>{errorMessage}</p>
      <label htmlFor="name">
        <b>
          <FormattedMessage id="auth-name-title" />
          {errors.name && <ValidateError message={errors.name.message} />}
        </b>
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
          type="text"
          className={styles.text}
          placeholder={`${intl.formatMessage({ id: 'auth-input-name' })}`}
        />
      </label>
      {signInJsx}
    </form>
  ) : (
    <form onSubmit={handleSubmit(onSubmitIn)} className={styles.container}>
      <p>{errorMessage}</p>
      {signInJsx}
    </form>
  );
}

export default Authorization;
