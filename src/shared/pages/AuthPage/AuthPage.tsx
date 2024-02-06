import React from 'react';

import { preventDefault } from 'src/utils/react/preventDefault';
import { useHandleForm } from 'src/hooks/useHandleForm';

import { Loading } from 'src/shared/components/Loading';

import styles from './authpage.module.css';
import { Logo } from './Logo';
import { FormAuth } from './FormAuth';
import { Copyright } from './Copyright';

export function AuthPage() {
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
