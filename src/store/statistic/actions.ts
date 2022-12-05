import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

// STATISTIC_REQUEST
export const STATISTIC_REQUEST = 'STATISTIC_REQUEST';

export type StatisticRequestAction = {
  type: typeof STATISTIC_REQUEST;
}

export const statisticRequest: ActionCreator<StatisticRequestAction> = () => ({
  type: STATISTIC_REQUEST,
});

export interface IStatistic {
  focusTime: number;
  pauseTime: number;
  stopCount: number;
}

// STATISTIC_REQUEST_SUCCESS
export const STATISTIC_REQUEST_SUCCESS = 'STATISTIC_REQUEST_SUCCESS';

export type StatisticRequestSuccessAction = {
  type: typeof STATISTIC_REQUEST_SUCCESS;
  data: IStatistic;
}

export const statisticRequestSuccess: ActionCreator<StatisticRequestSuccessAction> = (data: IStatistic) => ({
  type: STATISTIC_REQUEST_SUCCESS,
  data,
});

// STATISTIC_REQUEST_ERROR
export const STATISTIC_REQUEST_ERROR = 'STATISTIC_REQUEST_ERROR';

export type StatisticRequestErrorAction = {
  type: typeof STATISTIC_REQUEST_ERROR;
  error: string;
}

export const statisticRequestError: ActionCreator<StatisticRequestErrorAction> = (error: string) => ({
  type: STATISTIC_REQUEST_ERROR,
  error,
});

export const STATISTICRequestAsync =
  (data: IStatistic): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch, getState) => {
    dispatch(statisticRequest());
    if (data) {
      localStorage.setItem('token-pomodoro-stattistic', JSON.stringify(data));
      dispatch(statisticRequestSuccess(data));
    } else {
      dispatch(statisticRequestError('Statistic not found'));
    }
  }
