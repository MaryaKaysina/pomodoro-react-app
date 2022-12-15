import React, { ChangeEvent, FormEvent } from 'react';
import { Button } from '../../../Button';
import { ErrorBlock } from '../../../ErrorBlock';
import { Icon, EIcons } from '../../../Icon';
import { EColors } from '../../../Text';
import styles from './modalform.css';

interface IError {
  code: number;
  message: string;
}

interface IModalForm {
  valueTimePomodoro: string;
  valueTimeShortBreak: string;
  valueTimeLongBreak: string;
  valueFrequencyLongBreak: string;
  valueIsActivePush: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: FormEvent) => void;
  onClick?: () => void;
  settingsError: IError;
}

const NOOP = () => {};

export function ModalForm({
  valueTimePomodoro,
  valueTimeShortBreak,
  valueTimeLongBreak,
  valueFrequencyLongBreak,
  valueIsActivePush,
  settingsError,
  onChange = NOOP,
  onSubmit = NOOP,
  onClick = NOOP,
}: IModalForm) {
  return (
    <form
      className={styles.modalForm}
      onSubmit={onSubmit}
    >
      <label className={styles.modalLabel}>
        <span className={styles.modalText}>Продолжительность «помидора»:</span>
        <input
          type='number'
          className={styles.modalInput}
          onChange={onChange}
          id='timePomodoro'
          value={valueTimePomodoro}
        />
        <span className={styles.modalDesc}>(в минутах)</span>
        {settingsError && settingsError.code === 211 && (
          <div className={styles.modalError}>
            <ErrorBlock message={settingsError.message} color={EColors.red} size={12}/>
          </div>
        )}
      </label>
      <label className={styles.modalLabel}>
        <span className={styles.modalText}>Продолжительность короткого перерыва:</span>
        <input
          type='number'
          className={styles.modalInput}
          onChange={onChange}
          id='timeShortBreak'
          value={valueTimeShortBreak}
        />
        <span className={styles.modalDesc}>(в минутах)</span>
        {settingsError && settingsError.code === 212 && (
          <div className={styles.modalError}>
            <ErrorBlock message={settingsError.message} color={EColors.red} size={12}/>
          </div>
        )}
      </label>
      <label className={styles.modalLabel}>
        <span className={styles.modalText}>Продолжительность длинного перерыва:</span>
        <input
          type='number'
          className={styles.modalInput}
          onChange={onChange}
          id='timeLongBreak'
          value={valueTimeLongBreak}
        />
        <span className={styles.modalDesc}>(в минутах)</span>
        {settingsError && settingsError.code === 213 && (
          <div className={styles.modalError}>
            <ErrorBlock message={settingsError.message} color={EColors.red} size={12}/>
          </div>
        )}
      </label>
      <label className={styles.modalLabel}>
        <span className={styles.modalText}>Длинный перерыв через каждые:</span>
        <input
          type='number'
          className={styles.modalInput}
          onChange={onChange}
          id='frequencyLongBreak'
          value={valueFrequencyLongBreak}
        />
        <span className={styles.modalDesc}>(в помидорах)</span>
        {settingsError && settingsError.code === 214 && (
          <div className={styles.modalError}>
            <ErrorBlock message={settingsError.message} color={EColors.red} size={12}/>
          </div>
        )}
      </label>
      <label className={styles.labelCheckbox}>
        <input
          className={styles.inputCheckbox}
          type="checkbox"
          id='agreeSettings'
          onChange={onChange}
          defaultChecked={valueIsActivePush === 'true'}
        />
        <span className={styles.checkbox}></span>
        Показывать уведомления
      </label>
      <Button>Сохранить</Button>
      <button className={styles.modalClose} onClick={onClick}>Отмена</button>
      <button className={styles.modalCloseBtn} onClick={onClick}>
        <Icon name={EIcons.closeIcon} />
      </button>
    </form>
  );
}
