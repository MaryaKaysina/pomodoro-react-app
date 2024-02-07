import { Button } from 'src/shared/components/Button';
import { ErrorBlock } from 'src/shared/components/ErrorBlock';
import { Icon } from 'src/shared/components/Icon';

import { EColors } from 'src/shared/components/Text/text.interface';
import { EIcons } from 'src/shared/components/Icon/icon.interface';
import { IModalForm } from './modalform.interface';

import styles from './modalform.module.css';

export const ModalForm = ({
  valueTimePomodoro,
  valueTimeShortBreak,
  valueTimeLongBreak,
  valueFrequencyLongBreak,
  valueIsActivePush,
  settingsError,
  onChange = () => {},
  onSubmit = () => {},
  onClick = () => {},
}: IModalForm) => {
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
