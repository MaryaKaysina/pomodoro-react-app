import { Reducer } from "redux";
import
{
  TASKS_REQUEST,
  TASKS_REQUEST_SUCCESS,
  TASKS_REQUEST_ERROR,
  TasksRequestAction,
  TasksRequestSuccessAction,
  TasksRequestErrorAction,
  ITaskItem
} from "./actions";

export type TasksState = {
  loading: boolean;
  error: string;
  data: ITaskItem[];
}

export const initialTasksState: TasksState = {
  loading: false,
  error: '',
  data: [
    { id: 0, text: 'Сверстать сайт', time: 25 },
    { id: 1, text: 'Проверить валидность', time: 50 },
  ]
}

type TasksActions = TasksRequestAction
  | TasksRequestSuccessAction
  | TasksRequestErrorAction;

export const tasksReducer: Reducer<TasksState, TasksActions> = (state = initialTasksState, action) => {
  switch(action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case TASKS_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case TASKS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    default:
      return state;
  }
}
