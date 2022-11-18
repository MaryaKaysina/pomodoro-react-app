import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

// TASKS_REQUEST
export const TASKS_REQUEST = 'TASKS_REQUEST';

export type TasksRequestAction = {
  type: typeof TASKS_REQUEST;
}

export const tasksRequest: ActionCreator<TasksRequestAction> = () => ({
  type: TASKS_REQUEST,
});

// TASKS_REQUEST_SUCCESS
export interface ITaskItem {
  id: number;
  text: string;
  time: number;
}

export const TASKS_REQUEST_SUCCESS = 'TASKS_REQUEST_SUCCESS';

export type TasksRequestSuccessAction = {
  type: typeof TASKS_REQUEST_SUCCESS;
  data: ITaskItem[];
}

export const tasksRequestSuccess: ActionCreator<TasksRequestSuccessAction> = (data: ITaskItem[]) => ({
  type: TASKS_REQUEST_SUCCESS,
  data,
});

// TASKS_REQUEST_ERROR
export const TASKS_REQUEST_ERROR = 'TASKS_REQUEST_ERROR';

export type TasksRequestErrorAction = {
  type: typeof TASKS_REQUEST_ERROR;
  error: string;
}

export const tasksRequestError: ActionCreator<TasksRequestErrorAction> = (error: string) => ({
  type: TASKS_REQUEST_ERROR,
  error,
});

interface ITaskData {
  text: string;
  time?: number;
}

export const tasksRequestAsync =
  ({ text, time = 25 }: ITaskData): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(tasksRequest());

    if (text.length !== 0) {
      const tasksList = getState().tasks.data;

      const task = {
        id: tasksList.length,
        text,
        time
      };
      tasksList.push(task);
      dispatch(tasksRequestSuccess(tasksList));
    } else {
      dispatch(tasksRequestError('Our new task is empty(:'));
    }
  }

