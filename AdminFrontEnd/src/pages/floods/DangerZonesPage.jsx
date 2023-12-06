import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { DangerZone } from "../../components/FloodComponents/DangerZone";
import { PredictionMap } from "../../components/FloodComponents/PredictionMap";

export default function DangerZonesPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Heat Maps</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Heat Maps</li>
        </ul>
      </div>
      
      <PredictionMap/>
      <DangerZone/>
    </>
  );
}
