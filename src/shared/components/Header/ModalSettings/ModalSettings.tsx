import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authRequestAsync, IData } from 'src/store/auth/actions';
import { updateFrequencyLongBreak } from 'src/store/frequency_long_break';
import { updateIsActivePush } from 'src/store/is_active_push';
import { initialCurrentState, RootState } from 'src/store/reducer';
import { updateTimeLongBreak } from 'src/store/time_long_break';
import { updateTimePomodoro } from 'src/store/time_pomodoro';
import { updateTimeShortBreak } from 'src/store/time_short_break';
import { formatTimeToValue } from 'src/utils/js/formatTimeToValue';
import { updateFormCheckbox } from 'src/utils/js/updateFormCheckbox';
import { updateFormInputSetting } from 'src/utils/js/updateFormInputSetting';
import { IError, validateSettings } from 'src/utils/js/validateSettings';
import { preventDefault } from 'src/utils/react/preventDefault';

import { ModalForm } from './ModalForm';

import { IModalSettings } from './modalsettings.interface';

import styles from './modalsettings.module.css';

export const ModalSettings = (props: IModalSettings) => {
  const [settingsError, setSettingsError] = React.useState<IError>({ code: 0, message: '' });
  const body = document.querySelector('body');
  const node = document.querySelector('#modal_root');
  if (!node) return null;

  const data = useSelector<RootState, IData>(state => state.auth.data);
  const timePomodoro = useSelector<RootState, string>(state => state.timePomodoro);
  const timeShortBreak = useSelector<RootState, string>(state => state.timeShortBreak);
  const timeLongBreak = useSelector<RootState, string>(state => state.timeLongBreak);
  const frequencyLongBreak = useSelector<RootState, string>(state => state.frequencyLongBreak);
  const isActivePush = useSelector<RootState, string>(state => state.isActivePush);

  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    const timePomodoroValue = formatTimeToValue(props.settings.timePomodoro);
    const timeShortBreakValue = formatTimeToValue(props.settings.timeShortBreak);
    const timeLongBreakValue = formatTimeToValue(props.settings.timeLongBreak);
    const frequencyLongBreakValue = props.settings.frequencyLongBreak.toString();

    dispatch(updateTimePomodoro(timePomodoroValue));
    dispatch(updateTimeShortBreak(timeShortBreakValue));
    dispatch(updateTimeLongBreak(timeLongBreakValue));
    dispatch(updateFrequencyLongBreak(frequencyLongBreakValue));
    dispatch(updateIsActivePush(props.settings.isActivePush.toString()));
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'agreeSettings') {
      const updateCheck = updateFormCheckbox(event.target.id, (event.target.checked)
        .toString());
      dispatch(updateCheck);
      return;
    }
    const updateValue = updateFormInputSetting(event.target.id, event.target.value);
    dispatch(updateValue);
  }

  function handleSubmit() {
    const newData: IData = validateSettings({
      timePomodoro,
      timeShortBreak,
      timeLongBreak,
      frequencyLongBreak,
      setSettingsError,
      isActivePush,
      data
    }) || initialCurrentState;

    dispatch(authRequestAsync(newData));
    body?.classList.remove('isModal');
    props.onClick?.();
  }

  function handleClick() {
    body?.classList.remove('isModal');
    props.onClick?.();
  }

  return ReactDOM.createPortal(
    (
      <div className={styles.container}>
        <div className={styles.modalBlock} id="modalBlock">
          <h3 className={styles.modalTitle}>Настройки таймера</h3>
          <ModalForm
            valueTimePomodoro={timePomodoro}
            valueTimeShortBreak={timeShortBreak}
            valueTimeLongBreak={timeLongBreak}
            valueFrequencyLongBreak={frequencyLongBreak}
            valueIsActivePush={isActivePush}
            onChange={handleChange}
            onClick={handleClick}
            onSubmit={preventDefault(handleSubmit)}
            settingsError={settingsError}
          />
        </div>
      </div>
    ), node);
}
