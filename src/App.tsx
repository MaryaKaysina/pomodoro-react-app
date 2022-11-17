import { hot } from 'react-hot-loader/root';
import './main.global.css';
import React from "react";
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { TextBlock } from './shared/TextBlock';
import { PomodorBlock } from './shared/PomodorBlock';
import { Form } from './shared/Form';
import { TaskList } from './shared/TaskList';

function AppComponent() {
  return (
    <>
      <Header />
      <Layout>
        <Content>
          <TextBlock />
          <Form />
          <TaskList />
          <PomodorBlock />
        </Content>
      </Layout>
    </>
  );
}

export  const App = hot(() => ( <AppComponent />));

