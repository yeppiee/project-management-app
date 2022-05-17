import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import locales from './constants/locales';
import messages from './localization/messages';
import App from './App';
import './index.css';
import { persistor, store } from './store';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <IntlProvider locale={locales.RU} messages={messages[locales.RU]}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </IntlProvider>
  </Provider>
);
