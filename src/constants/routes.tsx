import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Boards = lazy(() => import('../pages/Boards'));
const Board = lazy(() => import('../pages/Board'));
const SignUp = lazy(() => import('../pages/SignUp'));
const SignIn = lazy(() => import('../pages/SignIn'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/aboutUs',
    component: <AboutUs />,
  },
  {
    path: '/boards',
    component: <Boards />,
  },
  {
    path: '/boards/:id',
    component: <Board />,
  },
  {
    path: '/signUp',
    component: <SignUp />,
  },
  {
    path: '/signIn',
    component: <SignIn />,
  },
  {
    path: '/profile',
    component: <UserProfile />,
  },
  {
    path: '/404',
    component: <NotFound />,
  },
];

export default routes;
