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
      path: '/boards',
      name: intl.formatMessage({ id: 'burger-links-boards' }),
    },
    {
      id: 4,
      path: '/profile',
      name: intl.formatMessage({ id: 'burger-links-profile' }),
    },
  ];
};

export default useBurgerMenuLinks;
