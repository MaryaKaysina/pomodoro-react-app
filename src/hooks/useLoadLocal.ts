import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IData, authRequestAsync } from "../store/auth/actions";
import { initialCurrentState } from "../store/reducer";
import { APP_LOCAL_KEY } from "../utils/conts";

export const useLoadLocal = () => {
  const localString = localStorage.getItem(APP_LOCAL_KEY);
  const local: IData[] = localString ? JSON.parse(localString) : [initialCurrentState];
  const localCurrent: IData = local.sort((a, b) => b.logInDate - a.logInDate)[0];
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(authRequestAsync(localCurrent));
  }, []);
}
