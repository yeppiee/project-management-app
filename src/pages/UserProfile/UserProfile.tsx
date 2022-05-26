import React from 'react';
// import { useGetUserByIdQuery } from '../../store/reducers/TaskDealerApi';
import styles from './UserProfile.module.css';

function UserProfile() {
  // const [getId] = useGetUserByIdQuery();
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>Login</li>
        <li className={styles.item}>Name</li>
      </ul>
    </div>
  );
}

export default UserProfile;
