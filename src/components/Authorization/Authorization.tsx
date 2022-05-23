import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../customHooks/redux';
import { useSignInMutation, useSignUpMutation } from '../../store/reducers/TaskDealerApi';
import { userSlice } from '../../store/reducers/UserSlice';
import {
  AuthDataType,
  AuthPropsType,
  HookFormType,
  ResTokenType,
  SignInDataType,
} from '../../Types/AuthTypes';
import styles from './Authorization.module.css';

function Authorization({ type }: AuthPropsType) {
  const { changeUserLoginStatus, changeTokenStatus, changeToken } = userSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [signIn, { isError }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HookFormType>();
  const singInFunc = async (data: SignInDataType) => {
    await signIn(data)
      .unwrap()
      .then((res: ResTokenType) => {
        console.log('data', data);
        if (!isError) {
          dispatch(changeUserLoginStatus(true));
          dispatch(changeTokenStatus(true));
          dispatch(changeToken(res.token));
          navigate('/');
        }
      });
  };
  const onSubmitUp = async (data: AuthDataType) => {
    await signUp(data).then(() => {
      singInFunc(data);
    });
  };
  const onSubmitIn = async (data: SignInDataType) => {
    singInFunc(data);
  };
  return (
    <div>
      {type === 'SingUp' ? (
        <form onSubmit={handleSubmit(onSubmitUp)} className={styles.form}>
          <div className={styles.container}>
            <input
              {...register('name', {
                required: 'Write name',
                minLength: {
                  value: 3,
                  message: 'Min length 3',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Use latin letters',
                },
              })}
              type="text"
              className={styles.input}
              placeholder="Name"
            />
            <p>{errors.name?.message}</p>
            <input
              {...register('login', {
                required: 'Write login',
                minLength: {
                  value: 3,
                  message: 'Min length 3',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Use latin letters',
                },
              })}
              type="text"
              className={styles.input}
              placeholder="Login"
            />
            <p>{errors.login?.message}</p>
            <input
              {...register('password', {
                required: 'Write password',
                minLength: {
                  value: 3,
                  message: 'Min length 3',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Use latin letters',
                },
              })}
              type="password"
              className={styles.input}
              placeholder="Password"
            />
            <p>{errors.password?.message}</p>
          </div>
          <input type="submit" className={styles.btn__submit} placeholder="Submit" />
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmitIn)} className={styles.form}>
          <div className={styles.container}>
            <input
              {...register('login', {
                required: 'Write login',
                minLength: {
                  value: 3,
                  message: 'Min length 3',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Use latin letters',
                },
              })}
              type="text"
              className={styles.input}
              placeholder="Login"
            />
            <p>{errors.login?.message}</p>
            <input
              {...register('password', {
                required: 'Write password',
                minLength: {
                  value: 3,
                  message: 'Min length 3',
                },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Use latin letters',
                },
              })}
              type="password"
              className={styles.input}
              placeholder="Password"
            />
            <p>{errors.password?.message}</p>
          </div>
          <input type="submit" className={styles.btn__submit} placeholder="Submit" />
        </form>
      )}
    </div>
  );
}

export default Authorization;
