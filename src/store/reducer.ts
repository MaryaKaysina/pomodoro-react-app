import { ActionCreator, Reducer } from "redux";

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
  newTask: string;
  tasks: TasksState;
}

const initialState: RootState = {
  newTask: '',
  tasks: initialTasksState,
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

// MyAction
type MyAction = NewTaskAction
| TasksRequestAction
| TasksRequestSuccessAction
| TasksRequestErrorAction;

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
}


