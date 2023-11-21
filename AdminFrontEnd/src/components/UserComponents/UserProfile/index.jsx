import React from 'react'
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';
import styles from '@/styles/PageTitle.module.css';
import { Box, Typography } from "@mui/material";
import UserDonations from './UserDonations';
import PersonalInformation from './PersonalInformation';

export const UserProfile = ({user}) => {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>User Profile</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>User Profile</li>
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
                    src={user.userPhotoLink?user.userPhotoLink:'/images/admin/defaultProfile.jpg' }
                    alt="profile" 
                    className="borRadius100"
                    width="150px"
                    height="150px"
                    />
            </Box>

          {/* Personal Information */}
          <PersonalInformation user = {user} />

          {/* ActivityTimeline */}
          <UserDonations userId = {user._id} />
        </Grid>
      </Grid>
    </>
  )
}
