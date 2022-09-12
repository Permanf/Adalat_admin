import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

import i18n from './locales/i18next'
import {store} from './redux/store'
import './assets/css/main.css';
import './assets/css/tailwind.css';
import reportWebVitals from './reportWebVitals';
import Routes from './router/routes';
import { PuffLoader } from 'react-spinners';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div className="flex items-center justify-center w-screen h-screen"><PuffLoader/></div>}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Provider>
      </I18nextProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
