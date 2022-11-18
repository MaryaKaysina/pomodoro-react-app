import { hot } from 'react-hot-loader/root';
import './main.global.css';
import React from "react";
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { TextBlock } from './shared/TextBlock';
import { PomodorBlock } from './shared/PomodorBlock';
import { FormBlock } from './shared/FormBlock';
import { rootReducer } from './store/reducer';

import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { Auth } from './shared/Auth';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));

function AppComponent() {

  return (
    <Provider store={store}>
      <Auth/>
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

