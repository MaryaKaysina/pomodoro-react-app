import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IData, authRequestAsync } from "src/store/auth/actions";
import { updateNewTask } from "src/store/new_task";
import { RootState } from "src/store/reducer";
import { incSequence } from "src/utils/js/incSequence";
import { IError } from "src/utils/js/validate";
import { GenerateNewData } from "src/utils/react/GenerateNewData";

export const useHandleFormTaks = () => {
  const [error, setError] = React.useState<IError | undefined>(undefined);

  const dispatch = useDispatch<any>();

  const data = useSelector<RootState, IData>(state => state.auth.data);
  const newTask = useSelector<RootState, string>(state => state.newTask);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(updateNewTask(event.target.value));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (newTask.length > 0) {
      const newData: IData = GenerateNewData(data, incSequence(data.tasks), newTask);
      dispatch(authRequestAsync(newData));
      dispatch(updateNewTask(''));
      setError(undefined);
    } else {
      const err = {
        field: 'taskName',
        code: -1,
        message: 'Название задачи пустое(:'
      }
      setError(err);
    }
  }

  return {
    newTask,
    data,
    error,
    handleChange,
    handleSubmit,
  };
}
