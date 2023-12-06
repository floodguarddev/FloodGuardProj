import React, { useEffect, useState } from 'react'
//import { getFloodsList } from '../../services/floods.services';
import { useUser } from "@/context/UserContext"
import { Box, CircularProgress, Typography } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {useSnackbar } from 'notistack';
import { useView } from '@/context/ViewContext';
import { useNavigate } from "react-router-dom";
//import {deleteFlood} from "@/services/floods.services"
import { jsonToSearchQuery } from '../../utils/query';
import { getFloodsList } from '../../services/floods.services';
export const ViewFloodList = ({setSelectedFlood, setTotalRecords, rowsPerPage, query, handleEditOpen, floodsRefresh, setFloodsRefresh}) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useUser();
  const [floodsList,setFloodsList]=useState(null);
  const [emptyRows, setEmptyRows] = useState(rowsPerPage);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!floodsRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);
        setFloodsList([])
        getFloodsList(userContext.token, searchQuery).then(
            (response)=>{
                return response.data.data;
            }
        ).then((data)=>{
            setTotalRecords(data.total);
            setFloodsList(data.floods);
            setEmptyRows(rowsPerPage-data.floods.length);
            setFloodsRefresh(false);
        }).catch((error)=>{
                enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                }  });
            })
  }, 
  [floodsRefresh])

  const viewFlood = (floodId)=>{
    setViewContext((oldValues)=>{return {...oldValues, selectedFlood: floodId}});
    navigate(`/floods/${floodId}`);
  }

  function getDate(dateString){
    const dateObject = new Date(dateString);

    const month = dateObject.toLocaleString('en-US', { month: 'short' });
    const year = dateObject.getFullYear();

    return month + "-" + year
  }

  const deleteFloodFunc = (floodId)=>{
    deleteFlood(floodContext.token, floodId).then(
        (response)=>{
            return response.data.message;
        }
    ).then((message)=>{
        setFloodsRefresh(true);
        enqueueSnackbar(message, { variant: "success", anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }  });
    }).catch((error)=>{
        enqueueSnackbar(error.response.data.message || error.message , { variant: "error", anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }  });
    })
  }

  return (
    <>
        <TableHead sx={{ background: "#F7FAFF" }}>
            <TableRow>
            <TableCell
                align="center"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
            >
                Date
            </TableCell>

            <TableCell
                align="center"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
            >
                Description
            </TableCell>

            <TableCell
                align="center"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
            >
                Affected Cities Number
            </TableCell>

            <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
            >
                Action
            </TableCell>
            </TableRow>
        </TableHead>
        {
            floodsList?
            <TableBody>
            {floodsList.map((row) => (
            <TableRow key={row._id} hover={true}>
                <TableCell
                align="center"
                style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                }}
                >
                {getDate(row.date)}
                </TableCell>

                <TableCell
                align="center"
                style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                }}
                >
                {row.description}
                </TableCell>

                <TableCell
                align="center"
                style={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13px",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                }}
                >
                {row.districts.length}
                </TableCell>

                <TableCell
                align="right"
                sx={{ borderBottom: "1px solid #F7FAFF" }}
                >
                <Box
                    sx={{
                    display: "inline-block",
                    }}
                >
                    <Tooltip title="View" placement="top">
                    <IconButton
                        aria-label="view"
                        size="small"
                        color="info"
                        className="info"
                        onClick={()=>{
                            setSelectedFlood(row);
                        }}
                    >
                        <VisibilityIcon fontSize="inherit" />
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Remove" placement="top">
                    <IconButton
                        aria-label="remove"
                        size="small"
                        color="danger"
                        className="danger"
                        onClick={()=>{
                            deleteFloodFunc(row._id);
                        }}
                    >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit" placement="top">
                    <IconButton
                        aria-label="edit"
                        size="small"
                        color="primary"
                        className="primary"
                        onClick = {()=>{
                            handleEditOpen(row);
                        }}
                    >
                        <DriveFileRenameOutlineIcon fontSize="inherit" />
                    </IconButton>
                    </Tooltip>
                </Box>
                </TableCell>
            </TableRow>
            ))}

            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell
                colSpan={5}
                style={{ borderBottom: "1px solid #F7FAFF" }}
                />
            </TableRow>
            )}
            </TableBody>:
            <TableRow style={{ height: 53 * rowsPerPage }}>
            <TableCell
            colSpan={5}
            style={{ borderBottom: "1px solid #F7FAFF", textAlign: "center" }}
            >
                
                <CircularProgress />
            </TableCell>
        </TableRow>
            
        }
    </>
  )
}
