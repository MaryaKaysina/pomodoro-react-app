import { ActionCreator } from "redux";

// UPDATE_MAIL
export const UPDATE_MAIL = 'UPDATE_MAIL';

export type UpdateMailAction = {
  text: string;
  type: typeof UPDATE_MAIL;
}

export const updateMail: ActionCreator<UpdateMailAction> = (text: string) => ({
  type: UPDATE_MAIL,
  text
});
