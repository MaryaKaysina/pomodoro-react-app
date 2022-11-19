import { ActionCreator, Reducer } from "redux";
import { AuthRequestAction, AuthRequestSuccessAction, AuthRequestErrorAction, AUTH_REQUEST, AUTH_REQUEST_ERROR, AUTH_REQUEST_SUCCESS } from "./auth/actions";
import { authReducer, AuthState, initialAuthState } from "./auth/reducer";

import {
  TASKS_REQUEST,
  TASKS_REQUEST_SUCCESS,
  TASKS_REQUEST_ERROR,
  TasksRequestAction,
  TasksRequestSuccessAction,
  TasksRequestErrorAction
} from "./tasks/actions";
import { tasksReducer, TasksState, initialTasksState } from "./tasks/reducer";

export type RootState = {
  name: string;
  mail: string;
  isCheck: string;
  newTask: string;
  tasks: TasksState;
  auth: AuthState;
}

const initialState: RootState = {
  name: '',
  mail: '',
  isCheck: 'true',
  newTask: '',
  tasks: initialTasksState,
  auth: initialAuthState,
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
| TasksRequestAction
| TasksRequestSuccessAction
| TasksRequestErrorAction
| AuthRequestAction
| AuthRequestSuccessAction
| AuthRequestErrorAction;

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
    case TASKS_REQUEST:
    case TASKS_REQUEST_SUCCESS:
    case TASKS_REQUEST_ERROR:
      return {
        ...state,
        tasks: tasksReducer(state.tasks, action),
      }
    case AUTH_REQUEST:
    case AUTH_REQUEST_ERROR:
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        auth: authReducer(state.auth, action),
      }
    default:
      return state;
  }
}


