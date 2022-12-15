import { customErrorFactory } from "ts-custom-error";
import { IData } from "../../store/auth/actions";

export interface IError {
  code: number;
  message: string;
}

export interface IVadateForm {
  timePomodoro: string;
  timeShortBreak: string;
  timeLongBreak: string;
  frequencyLongBreak: string;
  isActivePush: string;
  data: IData[];
  setSettingsError: (value: React.SetStateAction<IError>) => void;
}

const SettingsError = customErrorFactory(function SettingsError (code: number, message= '') {
	this.code = code
	this.message = message
})

function checkValueNum(value: string) {
  const reg = /[\D]+(\.?|,?)+?[\D]/g;
  return (
    value.trim().length === 0 || !!value.trim().match(reg) || +value.trim() <= 0
  );
}

export function validateSettings({
  timePomodoro,
  timeShortBreak,
  timeLongBreak,
  frequencyLongBreak,
  setSettingsError,
  isActivePush,
  data
}: IVadateForm) {

  try {
    if (checkValueNum(timePomodoro)) {
      throw new SettingsError(211, 'Время должно быть цифрой больше нуля');
    }
    if (checkValueNum(timeShortBreak)) {
      throw new SettingsError(212, 'Время должно быть цифрой больше нуля');
    }
    if (checkValueNum(timeLongBreak)) {
      throw new SettingsError(213, 'Время должно быть цифрой больше нуля');
    }
    if (checkValueNum(frequencyLongBreak)) {
      throw new SettingsError(214, 'Частота длинных перерывов должна быть цифрой больше нуля');
    }

    const currentData = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0];

    currentData.settings.timePomodoro = Math.ceil(+timePomodoro * 60);
    currentData.settings.timeShortBreak = Math.ceil(+timeShortBreak * 60);
    currentData.settings.timeLongBreak = Math.ceil(+timeLongBreak * 60);
    currentData.settings.frequencyLongBreak = Math.ceil(+frequencyLongBreak);
    currentData.settings.isActivePush = isActivePush === 'true';

    return data;
  } catch (error: any) {
    setSettingsError({ code: error.code, message: error.message });
  }
}
