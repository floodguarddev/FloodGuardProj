import React from 'react'
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';
import styles from '@/styles/PageTitle.module.css';
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getPublishDate } from '../../utils/date';

export const SpecificNews = ({news}) => {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Flood News</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Flood News</li>
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
                          {news.title}
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
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {news.description}
                    </Typography>
                  </Box>
                </Box>
              <CardMedia
                sx={{ height: 400, borderRadius:"8px" }}
                image={news.imageUrl}
              />
              
              <CardContent>
              
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
                      {getPublishDate(news.publishedAt)} @ {news.author}
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
                      {news.content}
                    </Typography>
                  </Box>
                </Box>
            </CardContent>

            <Grid textAlign={"center"} m={2}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "30px",
                      fontSize: "14px",
                      p: "12px 20px",
                      color: "#fff !important",
                      ml:"10px"
                    }}
                    target="_blank"
                    href={news.url}
                  >
                    Open Url
                  </Button>
              </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
