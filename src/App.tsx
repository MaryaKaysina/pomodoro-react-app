import React, { useEffect, useState } from "react";
import { hot } from 'react-hot-loader/root';
import './main.global.css';

import { Auth } from './shared/Auth';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { TextBlock } from './shared/TextBlock';
import { PomodorBlock } from './shared/PomodorBlock';
import { FormBlock } from './shared/FormBlock';

import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { rootReducer } from './store/reducer';
import { Link, Navigate, Route, Routes } from "react-router-dom";

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

function AppComponent() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const localToken = localStorage.getItem('token-pomodoro') || '';
    setToken(localToken);
  }, [])

  return (
    <Provider store={store}>
      {token === '' && (
        <Routes>
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      )}
      {/* <Auth/> */}
      {/* <Header />
      <Layout>
        <Content>
          <TextBlock />
          <FormBlock />
          <PomodorBlock />
        </Content>
      </Layout> */}
    </Provider>
  );
}

export  const App = hot(() => ( <AppComponent />));

