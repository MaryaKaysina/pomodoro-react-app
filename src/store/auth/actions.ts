import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

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
}

export interface IData {
  auth: string;
  logInDate: number;
  tasks: ITask[];
}

// AUTH_REQUEST_SUCCESS
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';

export type AuthRequestSuccessAction = {
  type: typeof AUTH_REQUEST_SUCCESS;
  data: IData[];
}

export const authRequestSuccess: ActionCreator<AuthRequestSuccessAction> = (data: IData[]) => ({
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
  (data: IData[]): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(authRequest());
    const currentData = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1);

    if (currentData[0].auth.length !== 0) {
      localStorage.setItem('token-pomodoro', JSON.stringify(data));
      dispatch(authRequestSuccess(data));
    } else {
      dispatch(authRequestError('Our e-mail is empty(:'));
    }
  }
