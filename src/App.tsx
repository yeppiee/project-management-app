import { Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { routes, welcomeRoutes } from './constants/routes';
import { useAppSelector } from './customHooks/redux';
import Layout from './layout';
import Loader from './Loader';
import messages from './localization/messages';

function App() {
  const { userLoginStatus, localization } = useAppSelector((state) => state.userSlice);

  return (
    <IntlProvider locale={localization} messages={messages[localization]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {userLoginStatus ? (
            <Route>
              {routes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
                />
              ))}
              <Route path="/signIn" element={<Navigate to="/" />} />
              <Route path="/signUp" element={<Navigate to="/" />} />
              <Route path="/welcome" element={<Navigate to="/" />} />
            </Route>
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
