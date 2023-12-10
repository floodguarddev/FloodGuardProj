import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import NotificationTable from '../../components/Notification/NotificationTable';

export default function Notifications() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Notifications</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Notifications</li>
        </ul>
      </div>

      <NotificationTable/>
    </>
  );
}
