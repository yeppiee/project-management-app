/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styles from './BoardCardTitle.module.css';

function BoardCardTitle() {
  const [isTitleView, setTitleView] = useState(true);
  const [titleInputValue, setTitleInputValue] = useState('');
  const onClickTitle = () => setTitleView(false);
  const onClickCancel = () => {
    setTitleView(true);
    setTitleInputValue('');
  };
  const onClickSubmitRename = () => {
    if (titleInputValue.length === 0) {
      return null;
    }
    return setTitleView(true);
  };
  const onClickDeleteColumn = () => {};
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitleInputValue(e.target.value);
  return isTitleView ? (
    <div className={styles.titleContainer} role="button" tabIndex={0} onClick={onClickTitle}>
      <p className={styles.titleContent}>Column Title</p>
      <button
        type="button"
        className={styles.delete}
        aria-label="delete-column"
        onClick={onClickDeleteColumn}
      />
    </div>
  ) : (
    <div className={styles.titleContainer}>
      <button
        type="button"
        aria-label="submit-rename-button"
        className={styles.submit}
        onClick={onClickSubmitRename}
      />
      <button
        type="button"
        aria-label="cancel-button"
        className={styles.cancel}
        onClick={onClickCancel}
      />
      <input
        value={titleInputValue}
        onChange={onChangeTitle}
        className={styles.titleInput}
        type="text"
      />
    </div>
  );
}

export default BoardCardTitle;
