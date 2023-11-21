import React from 'react';
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';
import styles from '@/styles/PageTitle.module.css'
import UsersStatus from '../../components/Graphs/UsersStatus'
import DonationsGraph from '../../components/Graphs/DonationsGraph'
import NgosStatus from '../../components/Graphs/NgosStatus';
import Summary from '../../components/Summary';
import CamerasInstalled from '../../components/Graphs/CamerasInstalled';

export default function Dashboard() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
        </ul>
      </div>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={12} md={12} lg={12} xl={4}>
          {/* Ratings */}
          <Summary />

        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={8}>

          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <Grid item xs={12} md={12}>
              {/* RevenuStatus */}
              <UsersStatus/>
              <CamerasInstalled/>
              <DonationsGraph/>
              <NgosStatus />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
