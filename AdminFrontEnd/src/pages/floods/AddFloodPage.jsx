import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { AddFlood } from "../../components/FloodComponents/AddFlood";

export default function AddFloodPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add New Flood</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add Flood</li>
        </ul>
      </div>

      <AddFlood/>
    </>
  );
}
