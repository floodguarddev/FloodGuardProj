import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { AddFundRaising } from "../../components/FundRaisingComponents/AddFundRaising";

export default function AddFundRaisingPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add Fund Raising</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add Fund Raising</li>
        </ul>
      </div>

      <AddFundRaising />
    </>
  );
}
