import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { AddAdmin } from "../../components/AdminComponents/AddAdmin";

export default function AddAdminPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add New Admin</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add Admin</li>
        </ul>
      </div>

      <AddAdmin/>
    </>
  );
}
