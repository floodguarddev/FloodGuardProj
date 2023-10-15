import * as React from "react";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { AddNgoParticipation } from "../../components/NgoParticipationComponents/AddNgoParticipation";

export default function AddNgoParticipationPage() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Add NGO Participation</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Add NGO Participation</li>
        </ul>
      </div>

      <AddNgoParticipation />
    </>
  );
}
