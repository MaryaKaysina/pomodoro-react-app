import { Reducer } from "redux";
import { IStatistic, StatisticRequestAction, StatisticRequestErrorAction, StatisticRequestSuccessAction, STATISTIC_REQUEST, STATISTIC_REQUEST_ERROR, STATISTIC_REQUEST_SUCCESS } from "./actions";


export type StatisticState = {
  loading: boolean;
  error: string;
  data: IStatistic;
}

export const initialStatisticState: StatisticState = {
  loading: false,
  error: '',
  data: {
    focusTime: 0,
    pauseTime: 0,
    stopCount: 0,
  }
}

type StatisticActions = StatisticRequestAction
  | StatisticRequestSuccessAction
  | StatisticRequestErrorAction;

export const statisticReducer: Reducer<StatisticState, StatisticActions> = (state = initialStatisticState, action) => {
    switch(action.type) {
      case STATISTIC_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case STATISTIC_REQUEST_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        }
      case STATISTIC_REQUEST_SUCCESS:
        return {
          ...state,
          data: action.data,
          loading: false,
        }
      default:
        return state;
    }
  }
