import React, { useState } from 'react';
import { Buffer } from 'buffer';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAppDispatch } from '../../customHooks/redux';
import { useSignInMutation, useSignUpMutation } from '../../store/reducers/TaskDealerApi';
import { userSlice } from '../../store/reducers/UserSlice';
import { AuthDataType, AuthPropsType, ResTokenType, SignInDataType } from '../../Types/AuthTypes';
import styles from './Authorization.module.css';

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
  } = useForm<AuthDataType>();
  const intl = useIntl();

  const getId = (res: ResTokenType) => {
    const buf = Buffer.from(res.token.split('.')[1], 'base64');
    const id = JSON.parse(buf.toString('utf8')).userId;
    const time = JSON.parse(buf.toString('utf8')).iat;
    dispatch(changeUserId(id));
    dispatch(changeTimeToken(time));
  };

  const singInFunc = async (data: SignInDataType) => {
    const sendData = {
      login: data.login,
      password: data.password,
    };
    await signIn(sendData)
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
    <div className={styles.container}>
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
        className={styles.input}
        placeholder={`${intl.formatMessage({ id: 'auth-input-login' })}`}
      />
      <p>{errors.login?.message}</p>
      <input
        {...register('password', {
          required: `${intl.formatMessage({ id: 'auth-input-password' })}`,
          minLength: {
            value: 3,
            message: `${intl.formatMessage({ id: 'auth-input-length' })}`,
          },
          pattern: {
            value: /^[A-Za-z]+$/i,
            message: `${intl.formatMessage({ id: 'auth-input-letters' })}`,
          },
        })}
        type="password"
        className={styles.input}
        placeholder={`${intl.formatMessage({ id: 'auth-input-password' })}`}
      />
      <p>{errors.password?.message}</p>
      <input
        type="submit"
        className={styles.btn__submit}
        value={`${intl.formatMessage({ id: 'auth-input-submit' })}`}
      />
    </div>
  );
  return (
    <div>
      {type === 'SingUp' ? (
        <form onSubmit={handleSubmit(onSubmitUp)} className={styles.form}>
          <p>{errorMessage}</p>
          <div className={styles.container}>
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
              className={styles.input}
              placeholder={`${intl.formatMessage({ id: 'auth-input-name' })}`}
            />
            <p>{errors.name?.message}</p>
            {signInJsx}
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmitIn)} className={styles.form}>
          <p>{errorMessage}</p>
          {signInJsx}
        </form>
      )}
    </div>
  );
}

export default Authorization;
