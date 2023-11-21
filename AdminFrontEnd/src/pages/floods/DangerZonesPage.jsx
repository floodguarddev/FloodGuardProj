import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { DangerZone } from "../../components/FloodComponents/DangerZone";

export default function DangerZonesPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Danger Zones</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Danger Zones</li>
        </ul>
      </div>

      <DangerZone/>
    </>
  );
}
