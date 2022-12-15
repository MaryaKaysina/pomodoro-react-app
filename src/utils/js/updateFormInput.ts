import { updateMail } from "../../store/update_mail";
import { updateName } from "../../store/update_name";


export interface IUpdateFormInput {
  field: string;
  value: string;
}

export function updateFormInput(field: string, value: string) {
  if (field === 'name') {
    return updateName(value);
  }
  if (field === 'mail') {
    return updateMail(value);
  }
}
