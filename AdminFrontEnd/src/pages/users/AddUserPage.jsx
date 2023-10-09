import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { AddUser } from "../../components/UserComponents/AddUser";

export default function AddUserPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add New User</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add User</li>
        </ul>
      </div>

      <AddUser/>
    </>
  );
}
