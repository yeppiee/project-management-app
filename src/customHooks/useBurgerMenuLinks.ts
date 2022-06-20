import { useIntl } from 'react-intl';

const useBurgerMenuLinks = () => {
  const intl = useIntl();
  return [
    {
      id: 1,
      path: '/',
      name: intl.formatMessage({ id: 'burger-links-home' }),
    },
    {
      id: 2,
      path: '/aboutUs',
      name: intl.formatMessage({ id: 'burger-links-aboutUs' }),
    },
    {
      id: 3,
      path: '/profile',
      name: intl.formatMessage({ id: 'burger-links-profile' }),
    },
    {
      id: 4,
      path: '/welcome',
      name: intl.formatMessage({ id: 'burger-links-welcome' }),
    },
  ];
};

export default useBurgerMenuLinks;
