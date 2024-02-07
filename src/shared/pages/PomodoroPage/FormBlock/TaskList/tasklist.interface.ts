import { ISettings } from "src/store/setSettings";

export interface ITaskItem {
  id: number;
  text: string;
  time: number;
  currentTime: number;
  createdAt: number;
  updateddAt: number;
  done: boolean;
  skip: boolean;
}

export interface ITaskList {
  tasks: ITaskItem[];
  settings: ISettings;
  onClick?: (id: number) => void;
  auth: string;
}
