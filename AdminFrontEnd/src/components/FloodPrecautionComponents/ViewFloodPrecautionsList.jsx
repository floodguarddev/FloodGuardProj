import React, { useEffect, useState } from 'react'
import { useUser } from "@/context/UserContext"
import { CircularProgress, } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {useSnackbar } from 'notistack';
import { useView } from '@/context/ViewContext';
import { Link, useNavigate } from "react-router-dom";
import { jsonToSearchQuery } from '../../utils/query';
import { deletePrecautions, getPrecautionsList } from '../../services/flood_precautions.services';
//import styles from "./ViewFloodPrecautionsList.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import styles from "@/components/FloodPrecautionComponents/ViewFloodPrecautionsList.module.css";

export const ViewFloodPrecautionsList = ({rowsPerPage, query, handleEditOpen, floodPrecautionsRefresh, setFloodPrecautionsRefresh}) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useUser();
  const [precautionsList,setPrecautionsList]=useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!floodPrecautionsRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);

        getPrecautionsList(userContext.token, searchQuery).then(
            (response)=>{
                console.log("Response", response);
                return response.data.data.flood_precautions;
            }
        ).then((flood_precautions)=>{
            setPrecautionsList(flood_precautions);
            setFloodPrecautionsRefresh(false);
        }).catch((error)=>{
            enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        })
  }, 
  [floodPrecautionsRefresh])

  const viewPrecautions = (precautionId)=>{
    try{
        setViewContext((oldValues)=>{return {...oldValues, selectedFloodPrecaution: precautionId}});
        console.log(precautionId)
        navigate(`/flood_precautions/${precautionId}`);
    }
    catch(error){
        alert(error)
    }
  }

  const deletePrecautionFunc = (precautionId)=>{
    deletePrecautions(userContext.token, precautionId).then(
        (response)=>{
            console.log(response);
            return response.data.message;
        }
    ).then((message)=>{
        setFloodPrecautionsRefresh(true);
        enqueueSnackbar(message, { variant: "success", anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }  });
    }).catch((error)=>{
        enqueueSnackbar(error.response? error.response.data.message : error.message , { variant: "error", anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }  });
    })
  }

  const FloodPrecautionCard = ({precaution})=>{
    return(
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={precaution._id}>
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

                <Box
                  sx={{
                    display: "inline-block",
                  }}
                >
                  <Tooltip title="Remove" placement="top">
                    <IconButton
                      aria-label="remove"
                      size="small"
                      color="danger"
                      className="danger"
                      sx={{ 
                        background: '#fff',
                        ml: '5px'
                      }}
                      onClick={()=>{
                        deletePrecautionFunc(precaution._id)
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit" placement="top">
                    <IconButton
                      aria-label="rename"
                      size="small"
                      color="primary"
                      className="primary"
                      sx={{ 
                        background: '#fff',
                        ml: '5px'
                      }}
                      onClick={()=>{
                        handleEditOpen(precaution);
                      }}
                    >
                      <DriveFileRenameOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
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
                    {precaution.description.slice(0,30)}...
                  </Typography>
                </Box>
              </Box>
              <ul className={styles.priceList}>
                {precaution.precautions.slice(0,(precaution.precautions.length>=4?4:(precaution.precautions.length))).map((list) => (
                  <li>
                    {list.slice(0,30)}...
                  </li>
                ))}
                {
                    <div style={{ height: 20.58 * (4-(precaution.precautions.length>=4?4:precaution.precautions.length))}}></div>
                }
              </ul>
              <Box align="center" mt={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "30px",
                      fontSize: "14px",
                      p: "12px 20px",
                      color: "#fff !important",
                    }}
                    onClick={()=>{
                        viewPrecautions(precaution._id)
                    }}
                  >
                    View Details
                  </Button>
              </Box>
            </Card>

          </Grid>
    )
}

  return (
    <>
        {
            precautionsList?
            <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        m={2}
      >
        {precautionsList.map((precaution) => (
          <FloodPrecautionCard precaution={precaution}/>
        ))}
      </Grid>:
            <div
            style={{ borderBottom: "1px solid #F7FAFF", textAlign: "center" }}
            >
            <CircularProgress />
            </div>
        }
    </>
  )
}
