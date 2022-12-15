import React, { useEffect, useState } from "react";
import { hot } from 'react-hot-loader/root';
import './main.global.css';
import stylesTransitions from './app.css';


import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { rootReducer } from './store/reducer';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AuthPage } from './shared/pages/AuthPage';
import { NotFoundPage } from "./shared/pages/NotFoundPage";
import { PomodoroPage } from "./shared/pages/PomodoroPage";
import { StatisticPage } from "./shared/pages/StatisticPage";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Header } from "./shared/components/Header";
import { mockData } from "./mock.test";

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

const classes = {
  enter: stylesTransitions['transition-enter'],
  enterActive: stylesTransitions['transition-enter-active'],
  exit: stylesTransitions['transition-exit'],
  exitActive: stylesTransitions['transition-exit-active']
};

const mockTestData = mockData();

function AppComponent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/auth' && <Header />}
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={300} classNames={classes}>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={ <AuthPage/> } />
            <Route path="/pomodoros" element={<PomodoroPage/>} />
            <Route path="/statistic" element={<StatisticPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

function AppMain() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Заполнение тестовыми данными
    // localStorage.setItem('token-pomodoro', JSON.stringify(mockTestData));
  }, []);

  return (
    <Provider store={store}>
      {mounted && (
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      )}
    </Provider>
  )
};

export const App = hot(() => (<AppMain />));
