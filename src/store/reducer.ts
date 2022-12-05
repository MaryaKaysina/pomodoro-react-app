import { ActionCreator, Reducer } from "redux";
import { AuthRequestAction, AuthRequestSuccessAction, AuthRequestErrorAction, AUTH_REQUEST, AUTH_REQUEST_ERROR, AUTH_REQUEST_SUCCESS } from "./auth/actions";
import { authReducer, AuthState, initialAuthState } from "./auth/reducer";
import { StatisticRequestAction, StatisticRequestErrorAction, StatisticRequestSuccessAction, STATISTIC_REQUEST, STATISTIC_REQUEST_ERROR, STATISTIC_REQUEST_SUCCESS } from "./statistic/actions";
import { initialStatisticState, statisticReducer, StatisticState } from "./statistic/reducer";

export type RootState = {
  name: string;
  mail: string;
  isCheck: string;
  newTask: string;
  auth: AuthState;
  statistic: StatisticState;
}

const initialState: RootState = {
  name: '',
  mail: '',
  isCheck: 'true',
  newTask: '',
  auth: initialAuthState,
  statistic: initialStatisticState,
}

// NEW_TASK
const NEW_TASK = 'NEW_TASK';

type NewTaskAction = {
  text: string;
  type: typeof NEW_TASK;
}

export const updateNewTask: ActionCreator<NewTaskAction> = (text: string) => ({
  type: NEW_TASK,
  text
});

// UPDATE_NAME
const UPDATE_NAME = 'UPDATE_NAME';

type UpdateNameAction = {
  text: string;
  type: typeof UPDATE_NAME;
}

export const updateName: ActionCreator<UpdateNameAction> = (text: string) => ({
  type: UPDATE_NAME,
  text
});

// UPDATE_MAIL
const UPDATE_MAIL = 'UPDATE_MAIL';

type UpdateMailAction = {
  text: string;
  type: typeof UPDATE_MAIL;
}

export const updateMail: ActionCreator<UpdateMailAction> = (text: string) => ({
  type: UPDATE_MAIL,
  text
});

// UPDATE_CHECK
const UPDATE_CHECK = 'UPDATE_CHECK';

type UpdateCheckAction = {
  isCheck: string;
  type: typeof UPDATE_CHECK;
}

export const updateCheck: ActionCreator<UpdateCheckAction> = (isCheck: string) => ({
  type: UPDATE_CHECK,
  isCheck
});

// MyAction
type MyAction = UpdateNameAction
| UpdateMailAction
| UpdateCheckAction
| NewTaskAction
| AuthRequestAction
| AuthRequestSuccessAction
| AuthRequestErrorAction
| StatisticRequestAction
| StatisticRequestSuccessAction
| StatisticRequestErrorAction;

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
    case AUTH_REQUEST:
    case AUTH_REQUEST_ERROR:
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        auth: authReducer(state.auth, action),
      }
    case STATISTIC_REQUEST:
    case STATISTIC_REQUEST_ERROR:
    case STATISTIC_REQUEST_SUCCESS:
      return {
        ...state,
        statistic: statisticReducer(state.statistic, action),
      }
    default:
      return state;
  }
}


