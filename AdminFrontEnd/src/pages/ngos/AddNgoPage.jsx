import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import AddNgo from "../../components/NgoComponents/AddNgo/";

export default function AddNgoPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add New Ngo</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add Ngo</li>
        </ul>
      </div>

      <AddNgo/>
    </>
  );
}
