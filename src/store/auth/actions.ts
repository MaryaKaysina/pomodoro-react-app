import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";
import { APP_LOCAL_KEY } from "../../utils/conts";

// AUTH_REQUEST
export const AUTH_REQUEST = 'AUTH_REQUEST';

export type AuthRequestAction = {
  type: typeof AUTH_REQUEST;
}

export const authRequest: ActionCreator<AuthRequestAction> = () => ({
  type: AUTH_REQUEST,
});

export interface ITask {
  id: number;
  text: string;
  time: number;
  currentTime: number;
  createdAt: number;
  updateddAt: number;
  done: boolean;
  skip: boolean;
  pomodor: number;
  currentPomodor: number;
}

export interface IPause {
  createdAt: number;
  time: number;
}

export interface ISettings {
  timePomodoro: number;
  timeShortBreak: number;
  timeLongBreak: number;
  frequencyLongBreak: number;
  isActivePush: boolean;
}

export interface IData {
  auth: string;
  logInDate: number;
  tasks: ITask[];
  currentTask: number;
  pauseTime: IPause[];
  isDark: boolean;
  settings: ISettings;
}

// AUTH_REQUEST_SUCCESS
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';

export type AuthRequestSuccessAction = {
  type: typeof AUTH_REQUEST_SUCCESS;
  data: IData;
}

export const authRequestSuccess: ActionCreator<AuthRequestSuccessAction> = (data: IData) => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

// AUTH_REQUEST_ERROR
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';

export type AuthRequestErrorAction = {
  type: typeof AUTH_REQUEST_ERROR;
  error: string;
}

export const authRequestError: ActionCreator<AuthRequestErrorAction> = (error: string) => ({
  type: AUTH_REQUEST_ERROR,
  error,
});

export const authRequestAsync =
  (data: IData): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(authRequest());
    const local = localStorage.getItem(APP_LOCAL_KEY) || '[]';
    const localData: IData[] = JSON.parse(local);

    if (data.auth.length !== 0) {
      const local = localData.filter((local) => local.auth !== data.auth);
      local.push(data);
      localStorage.setItem(APP_LOCAL_KEY, JSON.stringify(local));
      dispatch(authRequestSuccess(data));
    } else {
      dispatch(authRequestError('Our e-mail is empty(:'));
    }
  }
