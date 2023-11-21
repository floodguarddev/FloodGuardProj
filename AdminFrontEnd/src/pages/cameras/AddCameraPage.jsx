import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { AddCamera } from "../../components/CameraComponents/AddCamera";

export default function AddCameraPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add New Camera</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add Camera</li>
        </ul>
      </div>

      <AddCamera/>
    </>
  );
}
