import { hot } from 'react-hot-loader/root';
import './main.global.css';
import React, { useEffect, useState } from "react";
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

import { rootReducer } from './store/reducer';
import thunk from 'redux-thunk';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotFoundPage } from './shared/NotFoundPage';
import { TextBlock } from './shared/TextBlock';
import { PomodorBlock } from './shared/PomodorBlock';

function AppComponent() {
  return (
    <>
      <Header />
      <Layout>
        <Content>
          <TextBlock />
          <PomodorBlock />
        </Content>
      </Layout>
    </>
  );
}

export  const App = hot(() => ( <AppComponent />));

