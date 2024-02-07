import { Button } from 'src/shared/components/Button';
import { ErrorBlock } from 'src/shared/components/ErrorBlock';
import { Text } from 'src/shared/components/Text';
import { Input } from 'src/shared/components/Input';

import { EColors } from 'src/shared/components/Text/text.interface';
import { IFormAuth } from './formauth.interface';

import styles from './formauth.module.css';

export const FormAuth = (
  {
    valueName,
    valueMail,
    valueCheck,
    authError,
    onChange = () => {},
    onSubmit = () => {}
  }: IFormAuth) => {

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}>
      <Text As='h2' mobileSize={16} size={24} color={EColors.white}>
        Совсем чуть-чуть и можем начинать!
      </Text>

      <Input
        label='Введите имя'
        placeholder='Ваше имя'
        value={valueName}
        id='name'
        type='text'
        onChange={onChange}
        forInput='name'
        error={authError}
      />

      <Input
        label='Введите email'
        placeholder='E-mail'
        value={valueMail}
        id='mail'
        type='mail'
        onChange={onChange}
        forInput='mail'
        error={authError}
      />

      <Button>
        Зарегистрироваться
        {authError && authError.code === 114 && <ErrorBlock message={authError.message}/>}
      </Button>

      <label className={styles.labelCheckbox}>
        <input
          className={styles.inputCheckbox}
          type="checkbox"
          id='agree'
          defaultChecked={valueCheck === 'true'}
          onChange={onChange}
        />
        <span className={styles.checkbox}></span>
        Согласен на обработку персональных данных
      </label>
    </form>
  );
}
