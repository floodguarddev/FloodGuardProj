import React from 'react'
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';
import styles from '@/styles/PageTitle.module.css';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getPublishDate } from '../../utils/date';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

export const SpecificFundRaising = ({fundRaising}) => {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Fund Raising Post</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Fund Raising Post</li>
        </ul>
      </div>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={12}>
        <Card sx={{ m: '2px', p: '5px 10px'}}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box >
                      <Typography
                          as="h3"
                          sx={{
                          fontSize: 35,
                          fontWeight: 800,
                          mb: "5px",
                          }}
                      >
                          {fundRaising.postTitle}
                      </Typography>
                    </Box>
                  </Box> 
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: "20px",
                  }}
                >
                  
                </Box>
              <Swiper 
                navigation={true} 
                className="mySwiper"
                modules={[Navigation]}
              >
                {
                  fundRaising.postImagesLinks.map((image)=>(
                    <SwiperSlide>
                      <CardMedia image = {image} sx={{height: 400, borderRadius:"8px" }}/>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              <CardContent>
              
              <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: "20px",
                    gap: "10px"
                  }}
                >
                  <Link
                    style={{ textDecoration: 'none' }}>
                      <Avatar alt={fundRaising.ngoName} src={fundRaising.ngoImageLink} />
                    </Link>
                    
                  <Box>
                    <Link
                    style={{ textDecoration: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 650
                      }}
                    >
                      {fundRaising.ngoName}
                    </Typography>
                    </Link>
                    
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {getPublishDate(fundRaising.postedDate)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: "20px",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {fundRaising.content}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {fundRaising.postDescription}
                    </Typography>
                  </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
