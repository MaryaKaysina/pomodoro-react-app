import { ActionCreator } from "redux";

// NEW_TASK
export const NEW_TASK = 'NEW_TASK';

export type NewTaskAction = {
  text: string;
  type: typeof NEW_TASK;
}

export const updateNewTask: ActionCreator<NewTaskAction> = (text: string) => ({
  type: NEW_TASK,
  text
});
