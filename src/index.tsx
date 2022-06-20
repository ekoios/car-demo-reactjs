import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import App from './App';

import { persistor, store } from './redux/configStore';
import reportWebVitals from './reportWebVitals';
import { LIBRARY_CONSTANTS } from 'constants/library';

import 'antd/dist/antd.css';
import './App.css';
import './styles/_app.scss';
import { SWRConfig } from 'swr';

const onBeforeLift: any = (store: any) => {};

ReactDOM.render(
  <SWRConfig>
    <Web3ReactProvider getLibrary={LIBRARY_CONSTANTS.getLibrary}>
      <Provider store={store}>
        <PersistGate onBeforeLift={onBeforeLift(store)} loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Web3ReactProvider>
  </SWRConfig>,

  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
