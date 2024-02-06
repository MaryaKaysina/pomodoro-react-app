import { customErrorFactory } from "ts-custom-error";
import { IData } from "../../store/auth/actions";
import { DEFAULT_TIME, DEFAULT_TIME_BREAK, DEFAULT_TIME_BREAK_LONG, DEFAULT_FREQUENCY_LONG_BREAK, IS_ACTIVE, APP_LOCAL_KEY } from "../conts";

export interface IError {
  code: number;
  message: string;
}

export interface IVadateForm {
  name: string;
  mail: string;
  isCheck: string;
  data: IData;
  setAuthError: (value: React.SetStateAction<IError>) => void;
}

const AuthError = customErrorFactory(function AuthError (code: number, message= '') {
	this.code = code
	this.message = message
})

export function vadateForm({ name, mail, isCheck, data, setAuthError }: IVadateForm) {
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
    if (isCheck === 'false') {
      throw new AuthError(114, 'Не проставлено согласие (:');
    }

    const local = localStorage.getItem(APP_LOCAL_KEY) || '[]';
    const localData: IData[] = JSON.parse(local);
    const current = localData.filter((item) => item.auth === mail.trim())[0];

    const defaultSettings = {
      timePomodoro: DEFAULT_TIME,
      timeShortBreak: DEFAULT_TIME_BREAK,
      timeLongBreak: DEFAULT_TIME_BREAK_LONG,
      frequencyLongBreak: DEFAULT_FREQUENCY_LONG_BREAK,
      isActivePush: IS_ACTIVE,
    };

    const newAuthData: IData = {
      auth: mail.trim(),
      tasks: current ? current.tasks : [],
      currentTask: current ? current.currentTask : -1,
      logInDate: Date.now(),
      pauseTime: current ? current.pauseTime : [{ createdAt: 0, time: 0 }],
      isDark: current ? current.isDark : false,
      settings: current ? current.settings : defaultSettings,
    };

    return newAuthData;
  } catch (error: any) {
    setAuthError({ code: error.code, message: error.message });
  }
}
