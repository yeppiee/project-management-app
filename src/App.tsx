import { Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import locales from './constants/locales';
import { routes, welcomeRoutes } from './constants/routes';
import { useAppSelector } from './customHooks/redux';
import Layout from './layout';
import Loader from './Loader';
import messages from './store/messages/messages';

function App() {
  const { userLoginStatus } = useAppSelector((state) => state.userSlice);

  return (
    // В локаль подставить значение название локали из глобального стейта
    <IntlProvider locale={locales.RU} messages={messages[locales.RU]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {userLoginStatus ? (
            routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
              />
            ))
          ) : (
            <Route>
              {welcomeRoutes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
                />
              ))}
              <Route path="/" element={<Navigate to="welcome" />} />
              <Route path="*" element={<Navigate to="welcome" />} />
            </Route>
          )}
          <Route path="*" element={<Navigate replace to="404" />} />
        </Route>
      </Routes>
    </IntlProvider>
  );
}

export default App;
