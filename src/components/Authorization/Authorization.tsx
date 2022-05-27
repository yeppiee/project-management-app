import { Buffer } from 'buffer';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
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
  const [signIn] = useSignInMutation();
  const intl = useIntl();

  const authLogin = intl.formatMessage({ id: 'auth-input-login' });
  const authLoginMessageLength = intl.formatMessage({ id: 'auth-input-length' });
  const authLoginMessageLetters = intl.formatMessage({ id: 'auth-input-letters' });
  const authPassword = intl.formatMessage({ id: 'auth-input-password' });
  const authName = intl.formatMessage({ id: 'auth-input-name' });
  const authSubmit = intl.formatMessage({ id: 'auth-input-submit' });
  const authToastSignIn = intl.formatMessage({ id: 'toast-signin-success' });
  const authToastSignUp = intl.formatMessage({ id: 'toast-signup-success' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDataType>({
    mode: 'onBlur',
  });

  const getId = (res: ResTokenType) => {
    const buf = Buffer.from(res.token.split('.')[1], 'base64');
    const id = JSON.parse(buf.toString('utf8')).userId;
    const time = JSON.parse(buf.toString('utf8')).iat;
    dispatch(changeUserId(id));
    dispatch(changeTimeToken(time));
  };

  const singInFunc = (data: SignInDataType) => {
    signIn({ login: data.login, password: data.password })
      .unwrap()
      .then((res: ResTokenType) => {
        dispatch(changeUserLoginStatus(true));
        dispatch(changeTokenStatus(true));
        dispatch(changeToken(res.token));
        getId(res);
        navigate('/');
        toast.success(authToastSignIn);
      })
      .catch((error) => toast.error(`${error.data.message}`));
  };

  const onSubmitUp = (data: AuthDataType) => {
    signUp(data)
      .unwrap()
      .then(() => {
        toast.success(authToastSignUp);
        singInFunc(data);
      })
      .catch((error) => toast.error(`${error.data.message}`));
  };
  const onSubmitIn = (data: SignInDataType) => {
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
            required: authLogin,
            minLength: {
              value: 3,
              message: authLoginMessageLength,
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: authLoginMessageLetters,
            },
          })}
          type="text"
          className={styles.text}
          placeholder={authLogin}
        />
      </label>
      <label htmlFor="password">
        <b>
          <FormattedMessage id="auth-password-title" />
          {errors.password && <ValidateError message={errors.password.message} />}
        </b>
        <input
          {...register('password', {
            required: authPassword,
            minLength: {
              value: 3,
              message: authLoginMessageLength,
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/i,
              message: authLoginMessageLetters,
            },
          })}
          type="password"
          className={styles.text}
          placeholder={authPassword}
        />
      </label>
      <input type="submit" className={styles.button} value={authSubmit} />
    </>
  );

  return type === 'SignUp' ? (
    <form onSubmit={handleSubmit(onSubmitUp)} className={styles.container}>
      <label htmlFor="name">
        <b>
          <FormattedMessage id="auth-name-title" />
          {errors.name && <ValidateError message={errors.name.message} />}
        </b>
        <input
          {...register('name', {
            required: authName,
            minLength: {
              value: 3,
              message: authLoginMessageLength,
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: authLoginMessageLetters,
            },
          })}
          type="text"
          className={styles.text}
          placeholder={authName}
        />
      </label>
      {signInJsx}
    </form>
  ) : (
    <form onSubmit={handleSubmit(onSubmitIn)} className={styles.container}>
      {signInJsx}
    </form>
  );
}

export default Authorization;
