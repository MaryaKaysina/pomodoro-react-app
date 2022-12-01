import React from 'react';
import { Content } from '../Content';
import { FormBlock } from '../FormBlock';
import { Header } from '../Header';
import { Layout } from '../Layout';
import { PomodorBlock } from '../PomodorBlock';
import { TextBlock } from '../TextBlock';
import styles from './pomodoropage.css';

export function PomodoroPage() {
  return (
    <>
      <Header />
      <Layout>
        <Content>
          <TextBlock />
          <FormBlock />
          <PomodorBlock />
        </Content>
      </Layout>
    </>
  );
}
