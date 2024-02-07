import { ISettings } from "src/store/auth/actions";

export interface IModalSettings {
  settings: ISettings;
  onClick?: () => void;
}
