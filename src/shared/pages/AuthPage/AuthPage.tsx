import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authRequestAsync, IData } from '../../../store/auth/actions';

import { RootState } from '../../../store/reducer';

import styles from './authpage.module.css';
import { Loading } from '../../components/Loading';
import { Logo } from './Logo';
import { FormAuth } from './FormAuth';
import { Copyright } from './Copyright';

import { IError, vadateForm } from '../../../utils/js/validate';
import { preventDefault } from '../../../utils/react/preventDefault';
import { updateFormInput } from '../../../utils/js/updateFormInput';
import { updateFormCheckbox } from '../../../utils/js/updateFormCheckbox';

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
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
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [])

  const data = useSelector<RootState, IData[]>(state => state.auth.data);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'agree') {
      const updateCheck = updateFormCheckbox(event.target.id, (event.target.checked).toString());
      dispatch(updateCheck);
      return;
    }
    const updateValue = updateFormInput(event.target.id, event.target.value);
    dispatch(updateValue);
  }

  function handleSubmit() {
    const newData: IData[] = vadateForm({ name, mail, isCheck, data, setAuthError }) || [];
    dispatch(authRequestAsync(newData));
    navigate('/pomodoros');
  }

  return (
    <div className={styles.container}>
      {!isLoading && <Loading />}
      <Logo/>
      <FormAuth
        valueName={name}
        valueMail={mail}
        valueCheck={isCheck}
        onChange={handleChange}
        onSubmit={preventDefault(handleSubmit)}
        authError={authError}
      />
      <Copyright/>
    </div>
  );
}
