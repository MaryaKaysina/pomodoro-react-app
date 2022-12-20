import { Reducer } from "redux";
import { DEFAULT_TIME, DEFAULT_TIME_BREAK, DEFAULT_TIME_BREAK_LONG, DEFAULT_FREQUENCY_LONG_BREAK, IS_ACTIVE } from "../utils/conts";
import {
  AuthRequestAction,
  AuthRequestSuccessAction,
  AuthRequestErrorAction,
  AUTH_REQUEST,
  AUTH_REQUEST_ERROR,
  AUTH_REQUEST_SUCCESS,
  IData
} from "./auth/actions";
import { authReducer, AuthState, initialAuthState } from "./auth/reducer";
import { CurrentDayAction, CURRENT_DAY } from "./current_day";
import { CurrentWeekAction, CURRENT_WEEK } from "./current_week";
import {
  FrequencyLongBreakAction,
  FREQUENCY_LONG_BREAK
} from "./frequency_long_break";
import { IsActivePushAction, IS_ACTIVE_PUSH } from "./is_active_push";
import { NewTaskAction, NEW_TASK } from "./new_task";
import { TimeLongBreakAction, TIME_LONG_BREAK } from "./time_long_break";
import { TimePomodoroAction, TIME_POMODORO } from "./time_pomodoro";
import { TimeShortBreakAction, TIME_SHORT_BREAK } from "./time_short_break";
import { UpdateCheckAction, UPDATE_CHECK } from "./update_check";
import { UpdateMailAction, UPDATE_MAIL } from "./update_mail";
import { UpdateNameAction, UPDATE_NAME } from "./update_name";

export type RootState = {
  name: string;
  mail: string;
  isCheck: string;
  newTask: string;
  currentDay: number;
  currentWeek: number;
  auth: AuthState;
  timePomodoro: string;
  timeShortBreak: string;
  timeLongBreak: string;
  frequencyLongBreak: string;
  isActivePush: string;
}

export const initialCurrentState: IData = {
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

const initialState: RootState = {
  name: '',
  mail: '',
  isCheck: 'true',
  newTask: '',
  currentDay: 0,
  currentWeek: 0,
  auth: initialAuthState,
  timePomodoro: '',
  timeShortBreak: '',
  timeLongBreak: '',
  frequencyLongBreak: '',
  isActivePush: 'true',
}

// MyAction
type MyAction = UpdateNameAction
| UpdateMailAction
| UpdateCheckAction
| NewTaskAction
| AuthRequestAction
| AuthRequestSuccessAction
| AuthRequestErrorAction
| CurrentDayAction
| CurrentWeekAction
| TimePomodoroAction
| TimeShortBreakAction
| TimeLongBreakAction
| FrequencyLongBreakAction
| IsActivePushAction;

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.text,
      };
    case UPDATE_MAIL:
      return {
        ...state,
        mail: action.text,
      };
    case UPDATE_CHECK:
      return {
        ...state,
        isCheck: action.isCheck,
      };
    case NEW_TASK:
      return {
        ...state,
        newTask: action.text,
      };
    case CURRENT_DAY:
      return {
        ...state,
        currentDay: action.currentDay,
      };
    case CURRENT_WEEK:
      return {
        ...state,
        currentWeek: action.currentWeek,
      };
    case AUTH_REQUEST:
    case AUTH_REQUEST_ERROR:
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        auth: authReducer(state.auth, action),
      }
    case TIME_POMODORO:
      return {
        ...state,
        timePomodoro: action.timePomodoro,
      };
    case TIME_SHORT_BREAK:
      return {
        ...state,
        timeShortBreak: action.timeShortBreak,
      };
    case TIME_LONG_BREAK:
      return {
        ...state,
        timeLongBreak: action.timeLongBreak,
      };
    case FREQUENCY_LONG_BREAK:
      return {
        ...state,
        frequencyLongBreak: action.frequencyLongBreak,
      };
    case IS_ACTIVE_PUSH:
      return {
        ...state,
        isActivePush: action.isActivePush,
      };
    default:
      return state;
  }
}


