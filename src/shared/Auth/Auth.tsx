import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customErrorFactory } from 'ts-custom-error';
import { authRequestAsync, IData } from '../../store/auth/actions';
import { RootState, updateCheck, updateMail, updateName } from '../../store/reducer';
import styles from './auth.css';
import { Copyright } from './Copyright';
import { FormAuth } from './FormAuth';
import { Logo } from './Logo';

const AuthError = customErrorFactory(function AuthError (code: number, message= '') {
	this.code = code
	this.message = message
})

interface IError {
  code: number;
  message: string;
}

export function Auth() {
  const [mounred, setMounted] = useState(false);
  const [authError, setAuthError] = useState<IError>({ code: 0, message: '' });
  const name = useSelector<RootState, string>(state => state.name);
  const mail = useSelector<RootState, string>(state => state.mail);
  const isCheck = useSelector<RootState, string>(state => state.isCheck);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const localDefault = JSON.stringify([{auth: "", tasks: [], logInDate: 0}]);
  const localString = localStorage.getItem('token-pomodoro') || localDefault;
  const local: IData[] = JSON.parse(localString);

  useEffect(() => {
    dispatch(authRequestAsync(local));
    setMounted(true);
  }, [])

  const data = useSelector<RootState, IData[]>(state => state.auth.data);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'name') {
      dispatch(updateName(event.target.value));
    }
    if (event.target.id === 'mail') {
      dispatch(updateMail(event.target.value));
    }
    if (event.target.id === 'agree') {
      dispatch(updateCheck(event.target.checked));
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const reg = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

    try {
      if (name.trim().length < 2) {
        throw new AuthError(111, 'Имя должно содержать от 2-х символов');
      }
      if (mail.trim().length === 0) {
        throw new AuthError(112, 'E-mail должен быть заполнен');
      }
      if (!mail.trim().match(reg)) {
        throw new AuthError(113, 'E-mail должен быть в формате mail@mail.mail');
      }
      if (!isCheck) {
        throw new AuthError(114, 'Не проставлено согласие (:');
      }

      const current = data.filter((item) => item.auth === mail.trim())[0];
      const other = data.filter((item) => item.auth !== mail.trim());

      const newAuthData: IData[] = [{
        auth: mail.trim(),
        tasks: current ? current.tasks : [],
        logInDate: Date.now(),
        pauseTime: current ? current.pauseTime : [{ createdAt: 0, time: 0 }]
      }];

      const newData: IData[] = [ ...other, ... newAuthData ];

      dispatch(authRequestAsync(newData));
      navigate('/pomodoros');
    } catch (error: any) {
      setAuthError({ code: error.code, message: error.message });
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Logo/>
        <FormAuth
          valueName={name}
          valueMail={mail}
          valueCheck={isCheck}
          onChange={handleChange}
          onSubmit={handleSubmit}
          authError={authError}
        />
        <Copyright/>
      </div>
    </>
  );
}
