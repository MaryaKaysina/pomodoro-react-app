import { IData } from "src/store/auth/actions";

export interface IModalDelete {
  tasks: IData;
  onClose?: () => void;
}
