import React, { useEffect, useState } from 'react'
import { useUser } from "@/context/UserContext"
import { CardActions, CardContent, CardMedia, CircularProgress, } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {useSnackbar } from 'notistack';
import { useView } from '@/context/ViewContext';
import { Link, useNavigate } from "react-router-dom";
import { jsonToSearchQuery } from '../../utils/query';
import { deleteNews, getNewsList } from '../../services/news.services';
//import styles from "./ViewNewsList.module.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { getPublishDate } from '../../utils/date';

export const ViewNewsList = ({setTotalRecords, rowsPerPage, query, handleEditOpen, newsRefresh, setNewsRefresh}) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useUser();
  const [newsList,setNewsList]=useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!newsRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);

        getNewsList(userContext.token, searchQuery).then(
            (response)=>{
                return response.data.data;
            }
        ).then((data)=>{
            setTotalRecords(data.total);
            setNewsList(data.news);
            setNewsRefresh(false);
        }).catch((error)=>{
            enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        })
  }, 
  [newsRefresh])

  const viewNews = (newsId)=>{
    try{
        setViewContext((oldValues)=>{return {...oldValues, selectedNews: newsId}});
        console.log(newsId)
        navigate(`/news/${newsId}`);
    }
    catch(error){
        alert(error)
    }
  }

  const deleteNewsFunc = (newsId)=>{
    deleteNews(userContext.token, newsId).then(
        (response)=>{
            console.log(response);
            return response.data.message;
        }
    ).then((message)=>{
        setNewsRefresh(true);
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

  const NewsCard = ({news})=>{
    return(
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={news._id}>
          <Card sx={{ mb: '15px' }}>
              <CardMedia
                sx={{ height: 160 }}
                image={news.imageUrl}
              />
              
              <CardContent>
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
                          fontSize: 20,
                          fontWeight: 500,
                          mb: "5px",
                          }}
                      >
                          {news.title.length>70?news.title.slice(0,70)+"...":news.title}
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
                          deleteNewsFunc(news._id)
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
                          handleEditOpen(news);
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
                      {news.description.length>120?news.description.slice(0,120)+"...":news.description}
                    </Typography>
                  </Box>
                </Box>

            </CardContent>

            <Grid textAlign={"end"} m={2}>
                <Button
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "10px",
                      fontSize: "14px",
                      p: "12px 20px",
                      color: "#fff !important",
                    }}
                    onClick={()=>{
                        viewNews(news._id)
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "10px",
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
    )
}

  return (
    <>
        {
            newsList?
            <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        m={2}
      >
        {newsList.map((news) => (
          <NewsCard news={news}/>
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
