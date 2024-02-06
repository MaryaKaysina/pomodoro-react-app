import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateFormCheckbox } from "src/utils/js/updateFormCheckbox";
import { updateFormInput } from "src/utils/js/updateFormInput";
import { IError, vadateForm } from "src/utils/js/validate";

import { initialCurrentState, RootState } from 'src/store/reducer';
import { IData, authRequestAsync } from "src/store/auth/actions";

export function useHandleForm() {
  const [authError, setAuthError] = React.useState<IError>({ code: 0, message: '' });

  const name = useSelector<RootState, string>(state => state.name);
  const mail = useSelector<RootState, string>(state => state.mail);
  const isCheck = useSelector<RootState, string>(state => state.isCheck);
  const data = useSelector<RootState, IData>(state => state.auth.data);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'agree') {
      const updateCheck = updateFormCheckbox(event.target.id, (event.target.checked).toString());
      dispatch(updateCheck);
      return;
    }
    const updateValue = updateFormInput(event.target.id, event.target.value);
    dispatch(updateValue);
  }

  function handleSubmit() {
    const formData = { name, mail, isCheck, data, setAuthError };
    const newData = vadateForm(formData);
    dispatch(authRequestAsync(newData || initialCurrentState));
    if (newData) navigate('/pomodoros');
  }

  return {
    name,
    mail,
    isCheck,
    authError,
    handleChange,
    handleSubmit
  };
}
