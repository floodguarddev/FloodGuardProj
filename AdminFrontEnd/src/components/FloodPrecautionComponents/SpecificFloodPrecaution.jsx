import React from 'react'
import Grid from "@mui/material/Grid";
import {Link} from 'react-router-dom';
import styles from '@/styles/PageTitle.module.css';
import { Box, Card, Typography } from "@mui/material";
import ListStyles from "@/components/FloodPrecautionComponents/ViewFloodPrecautionsList.module.css";

export const SpecificFloodPrecaution = ({precaution}) => {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Flood Precautions</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Flood Precautions</li>
        </ul>
      </div>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={12}>
        <Card
              sx={{
                borderRadius: "10px",
                p: "40px 25px",
                mb: "15px",
              }}
            >
                <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="team-card-dark"
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
                        fontSize: 20,
                        fontWeight: 500,
                        mb: "5px",
                        }}
                    >
                        {precaution.title}
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
                    {precaution.description}
                  </Typography>
                </Box>
              </Box>
              <ul className={ListStyles.priceList}>
                {precaution.precautions.map((list) => (
                  <li>
                    {list}
                  </li>
                ))}
                {
                    <div style={{ height: 20.58 * (4-(precaution.precautions.length>=4?4:precaution.precautions.length))}}></div>
                }
              </ul>
            </Card>
          
        </Grid>
      </Grid>
    </>
  )
}
