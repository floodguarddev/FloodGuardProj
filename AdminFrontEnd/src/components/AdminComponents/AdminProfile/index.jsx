import React from 'react'
import Grid from "@mui/material/Grid";
import Features from '@/components/Pages/Profile/Features';
//import Overview from '@/components/Pages/Profile/Overview';
import MyTasks from '@/components/Pages/Profile/MyTasks';
//import ImpressionGoalConversions from "@/components/Dashboard/Analytics/ImpressionGoalConversions";
import {Link} from 'react-router-dom';
import styles from '@/styles/PageTitle.module.css';
import { Box, Typography } from "@mui/material";
import PersonalInformation from './PersonalInformation';

export const AdminProfile = ({admin}) => {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Admin Profile</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Admin Profile</li>
        </ul>
      </div>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box textAlign={"center"} >
                    <img 
                    src={admin.adminPhotoLink?admin.adminPhotoLink:'/images/admin/defaultProfile.jpg' }
                    alt="profile" 
                    className="borRadius100"
                    width="150px"
                    height="150px"
                    />
            </Box>

          {/* Personal Information */}
          <PersonalInformation admin = {admin} />
        </Grid>
      </Grid>
    </>
  )
}
