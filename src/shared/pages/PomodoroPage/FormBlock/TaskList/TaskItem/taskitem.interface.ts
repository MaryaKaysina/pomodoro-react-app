export interface ITaskItem {
  taskId: number;
  currentId: number;
  onClick?: (id: number) => void;
}
