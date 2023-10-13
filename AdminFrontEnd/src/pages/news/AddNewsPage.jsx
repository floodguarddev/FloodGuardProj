import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { AddNews } from "../../components/NewsComponents/AddNews";

export default function AddNewsPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add News</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add News</li>
        </ul>
      </div>

      <AddNews/>
    </>
  );
}
