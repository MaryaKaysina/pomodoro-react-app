import { ActionCreator } from "redux";

// IS_ACTIVE_PUSH
export const IS_ACTIVE_PUSH = 'IS_ACTIVE_PUSH';

export type IsActivePushAction = {
  isActivePush: string;
  type: typeof IS_ACTIVE_PUSH;
}

export const updateIsActivePush: ActionCreator<IsActivePushAction> = (isActivePush: string) => ({
  type: IS_ACTIVE_PUSH,
  isActivePush
});
