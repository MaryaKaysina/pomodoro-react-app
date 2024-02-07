import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useLoadLocal } from 'src/hooks/useLoadLocal';
import { IData } from 'src/store/auth/actions';
import { RootState } from 'src/store/reducer';
import { Content } from 'src/shared/pages/StatisticPage/Content';
import { StatisticInfo } from 'src/shared/pages/StatisticPage/StatisticInfo';
import { TitleBlock } from 'src/shared/pages/StatisticPage/TitleBlock';

export const StatisticPage = () => {
  const [mounred, setMounted] = React.useState(false);

  useLoadLocal();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const data = useSelector<RootState, IData>(state => state.auth.data);

  return (
    <>
      {mounred && data.auth.length === 0 && (<Navigate to="/auth" replace />)}
      <Content>
        <TitleBlock/>
        <StatisticInfo />
      </Content>
    </>
  );
}
