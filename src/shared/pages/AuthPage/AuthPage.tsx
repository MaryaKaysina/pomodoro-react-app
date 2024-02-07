import React from 'react';

import { preventDefault } from 'src/utils/react/preventDefault';
import { useHandleForm } from 'src/hooks/useHandleForm';

import { Loading } from 'src/shared/components/Loading';
import { Logo } from 'src/shared/pages/AuthPage/Logo';
import { FormAuth } from 'src/shared/pages/AuthPage/FormAuth';
import { Copyright } from 'src/shared/pages/AuthPage/Copyright';

import styles from './authpage.module.css';

export const AuthPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    name,
    mail,
    isCheck,
    authError,
    handleChange,
    handleSubmit
  } = useHandleForm();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(true), 500);
    return () => clearTimeout(timer);
  }, [])

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
