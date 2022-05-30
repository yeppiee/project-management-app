import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';
import styles from './Search.module.css';

function Search() {
  const { searchInput } = useAppSelector((state) => state.userSlice);
  const { changeSearchInput } = userSlice.actions;
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (searchInput) {
      dispatch(changeSearchInput(searchInput));
    } else {
      dispatch(changeSearchInput(''));
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch(changeSearchInput(e.target.value));

  const handleClick = () => inputRef.current?.focus();

  return (
    <div className={styles.container}>
      <button type="button" onClick={handleClick}>
        <i className="fa-solid fa-magnifying-glass cursor-pointer" />
      </button>
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          value={searchInput}
          onChange={handleChange}
          placeholder="Search"
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default Search;
