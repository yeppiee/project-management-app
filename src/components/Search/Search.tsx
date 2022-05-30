import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../customHooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';

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
    <div className="flex items-center mb-10 gap-x-3 w-1/2">
      <button type="button" onClick={handleClick}>
        <i className="fa-solid fa-magnifying-glass cursor-pointer" />
      </button>
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="w-full p-1 rounded-md pl-2 bg-gray-200"
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
