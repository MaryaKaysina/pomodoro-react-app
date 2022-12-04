import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authRequestAsync, IData } from '../../store/auth/actions';
import { RootState } from '../../store/reducer';
import { ContentStatistic } from '../ContentStatistic';
import { Header } from '../Header';
import { Layout } from '../Layout';
import { StatisticInfo } from '../StatisticInfo';
import { TitleBlock } from '../TitleBlock';

import styles from './statisticpage.css';

export function StatisticPage() {
  const [mounred, setMounted] = useState(false);
  const dispatch = useDispatch<any>();

  const localDefault = JSON.stringify([{auth: "", tasks: [], logInDate: 0}]);
  const localString = localStorage.getItem('token-pomodoro') || localDefault;
  const local: IData[] = JSON.parse(localString);

  useEffect(() => {
    dispatch(authRequestAsync(local));
    setMounted(true);
  }, []);

  const data = useSelector<RootState, IData[]>(state => state.auth.data);
  const currentAuth = data.sort((a, b) => b.logInDate - a.logInDate).slice(0, 1)[0].auth;

  return (
    <>
      {/* {mounred && currentAuth.length === 0 && (<Navigate to="/auth" replace />)} */}
      <Header />
      <Layout>
        <ContentStatistic>
          <TitleBlock/>
          <StatisticInfo />
        </ContentStatistic>
      </Layout>
    </>
  );
}
