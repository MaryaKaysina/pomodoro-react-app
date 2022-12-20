import { Reducer } from "redux";
import { DEFAULT_TIME, DEFAULT_TIME_BREAK, DEFAULT_TIME_BREAK_LONG, DEFAULT_FREQUENCY_LONG_BREAK, IS_ACTIVE } from "../../utils/conts";
import
{
  AuthRequestAction,
  AuthRequestErrorAction,
  AuthRequestSuccessAction,
  AUTH_REQUEST,
  AUTH_REQUEST_ERROR,
  AUTH_REQUEST_SUCCESS,
  IData
} from "./actions";

export type AuthState = {
  loading: boolean;
  error: string;
  data: IData;
}

export const initialAuthState: AuthState = {
  loading: false,
  error: '',
  data: {
    auth: '',
    tasks: [],
    currentTask: -1,
    logInDate: 0,
    pauseTime: [{
      createdAt: 0,
      time: 0,
    }],
    isDark: false,
    settings: {
      timePomodoro: DEFAULT_TIME,
      timeShortBreak: DEFAULT_TIME_BREAK,
      timeLongBreak: DEFAULT_TIME_BREAK_LONG,
      frequencyLongBreak: DEFAULT_FREQUENCY_LONG_BREAK,
      isActivePush: IS_ACTIVE,
    }
  }
}

type AuthActions = AuthRequestAction
  | AuthRequestSuccessAction
  | AuthRequestErrorAction;

export const authReducer: Reducer<AuthState, AuthActions> = (state = initialAuthState, action) => {
    switch(action.type) {
      case AUTH_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case AUTH_REQUEST_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        }
      case AUTH_REQUEST_SUCCESS:
        return {
          ...state,
          data: action.data,
          loading: false,
        }
      default:
        return state;
    }
  }
