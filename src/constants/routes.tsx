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
    id: 1,
    path: '/',
    component: <Home />,
  },
  {
    id: 2,
    path: '/aboutUs',
    component: <AboutUs />,
  },
  {
    id: 3,
    path: '/boards',
    component: <Boards />,
  },
  {
    id: 4,
    path: '/boards/:id',
    component: <Board />,
  },
  {
    id: 5,
    path: '/signUp',
    component: <SignUp />,
  },
  {
    id: 6,
    path: '/signIn',
    component: <SignIn />,
  },
  {
    id: 7,
    path: '/profile',
    component: <UserProfile />,
  },
  {
    id: 8,
    path: '/404',
    component: <NotFound />,
  },
];

export default routes;
