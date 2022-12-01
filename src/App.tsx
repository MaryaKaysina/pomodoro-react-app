import React, { useEffect, useState } from "react";
import { hot } from 'react-hot-loader/root';
import './main.global.css';

import { Auth } from './shared/Auth';

import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { rootReducer } from './store/reducer';
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./shared/NotFoundPage";
import { PomodoroPage } from "./shared/PomodoroPage";
import { StatisticPage } from "./shared/StatisticPage";

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

function AppComponent() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Provider store={store}>
      {mounted && (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={ <Auth/> } />
            <Route path="/pomodoros" element={<PomodoroPage/>} />
            <Route path="/statistic" element={<StatisticPage/>} />
          </Routes>
        </BrowserRouter>
      )}
    </Provider>
  );
}

export  const App = hot(() => ( <AppComponent />));

