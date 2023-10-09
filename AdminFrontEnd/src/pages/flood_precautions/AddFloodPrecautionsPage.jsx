import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { AddFloodPrecautions } from "../../components/FloodPrecautionComponents/AddFloodPrecautions";

export default function AddFloodPrecautionsPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add New Flood Precautions</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add Flood Precautions</li>
        </ul>
      </div>

      <AddFloodPrecautions/>
    </>
  );
}
