import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useLoadLocal } from '../../../hooks/useLoadLocal';
import { IData } from '../../../store/auth/actions';
import { RootState } from '../../../store/reducer';
import { Content } from './Content';
import { StatisticInfo } from './StatisticInfo';

import { TitleBlock } from './TitleBlock';

export function StatisticPage() {
  const [mounred, setMounted] = useState(false);

  useLoadLocal();

  useEffect(() => {
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
