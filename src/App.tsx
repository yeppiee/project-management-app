import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './constants/routes';
import Layout from './layout';
import Loader from './Loader';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((route) => (
          <Route
            path={route.path}
            element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
          />
        ))}
        <Route path="*" element={<Navigate replace to="404" />} />
      </Route>
    </Routes>
  );
}

export default App;
