import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './constants/routes';
import Layout from './layout';
import Loader from './Loader';

function App() {
  return (
    <Routes>
      {true ? (
        <Route path="/" element={<Layout />}>
          {routes.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
            />
          ))}
          <Route path="/welcome" element={<Navigate replace to="/" />} />
        </Route>
      ) : (
        <Route>
          <Route path="/welcome" element={<div>Welcome Page</div>} />
          <Route path="*" element={<Navigate to="welcome" />} />
        </Route>
      )}
      <Route path="*" element={<Navigate replace to="404" />} />
    </Routes>
  );
}

export default App;
