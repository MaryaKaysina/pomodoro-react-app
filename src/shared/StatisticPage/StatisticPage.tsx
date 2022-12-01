import React from 'react';
import { ContentStatistic } from '../ContentStatistic';
import { Header } from '../Header';
import { Layout } from '../Layout';
import { TitleBlock } from '../TitleBlock';

import styles from './statisticpage.css';

export function StatisticPage() {
  return (
    <>
      <Header />
      <Layout>
        <ContentStatistic>
          <TitleBlock/>
          {/* <TextBlock />
          <FormBlock />
          <PomodorBlock /> */}
        </ContentStatistic>
      </Layout>
    </>
  );
}
