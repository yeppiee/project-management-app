import { useAppDispatch, useAppSelector } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';
import styles from './LanguageSwitcher.module.css';

function LanguageSwitcher() {
  const { localization } = useAppSelector((state) => state.userSlice);
  const { changeLocalization } = userSlice.actions;
  const dispatch = useAppDispatch();

  const handleChange = () =>
    localization === 'en' ? dispatch(changeLocalization('ru')) : dispatch(changeLocalization('en'));

  return (
    <div className={styles.container}>
      <label htmlFor="language-switch" className={styles.label}>
        <input
          type="checkbox"
          id="language-switch"
          className={styles.input}
          onChange={handleChange}
          checked={localization !== 'en'}
        />
      </label>
    </div>
  );
}

export default LanguageSwitcher;
