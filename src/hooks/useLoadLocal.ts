import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IData, authRequestAsync } from "../store/auth/actions";
import { initialCurrentState } from "../store/reducer";

export function useLoadLocal() {
  const localString = localStorage.getItem('token-pomodoro');
  const local: IData[] = localString ? JSON.parse(localString) : [initialCurrentState];
  const localCurrent: IData = local.sort((a, b) => b.logInDate - a.logInDate)[0];
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(authRequestAsync(localCurrent));
  }, []);
}
