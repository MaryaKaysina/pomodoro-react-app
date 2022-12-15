import { updateIsActivePush } from "../../store/is_active_push";
import { updateCheck } from "../../store/update_check";

export interface IUpdateFormInput {
  field: string;
  value: string;
}

export function updateFormCheckbox(field: string, value: string) {
  if (field === 'agree') {
    return updateCheck(value);
  }
  if (field === 'agreeSettings') {
    return updateIsActivePush(value);
  }
}
