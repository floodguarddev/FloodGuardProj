import React, { useEffect, useState } from 'react'
//import { getCamerasList } from '../../services/cameras.services';
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
//import {deleteCamera} from "@/services/cameras.services"
import { jsonToSearchQuery } from '../../utils/query';
export const ViewCameraList = ({setTotalRecords, rowsPerPage, query, handleEditOpen, camerasRefresh, setCamerasRefresh}) => {
  const navigate = useNavigate();
  const [cameraContext, setCameraContext] = useUser();
  const [camerasList,setCamerasList]=useState(null);
  const [emptyRows, setEmptyRows] = useState(rowsPerPage);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!camerasRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);
        setCamerasList([])
        // getCamerasList(cameraContext.token, searchQuery).then(
        //     (response)=>{
        //         console.log("Response", response);
        //         return response.data.data;
        //     }
        // ).then((data)=>{
        //     setTotalRecords(data.total);
        //     setCamerasList(data.cameras);
        //     setEmptyRows(rowsPerPage - data.cameras.length) ;
        //     setCamerasRefresh(false);
        // }).catch((error)=>{
        //     enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
        //         vertical: 'bottom',
        //         horizontal: 'right'
        //     }  });
        // })
  }, 
  [camerasRefresh])

  const viewCamera = (cameraId)=>{
    setViewContext((oldValues)=>{return {...oldValues, selectedCamera: cameraId}});
    navigate(`/cameras/${cameraId}`);
  }

  const deleteCameraFunc = (cameraId)=>{
    deleteCamera(cameraContext.token, cameraId).then(
        (response)=>{
            return response.data.message;
        }
    ).then((message)=>{
        setCamerasRefresh(true);
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
            camerasList?
            <TableBody>
            {camerasList.map((row) => (
            <TableRow key={row._id} hover={true}>
                <TableCell
                style={{
                    borderBottom: "1px solid #F7FAFF",
                    paddingTop: "13px",
                    paddingBottom: "13px",
                    display: "flex",
                    alignItems: "center",
                }}
                >
                <Box
                    sx={{
                    display: "flex",
                    alignItems: "center",
                    }}
                    className="ml-10px"
                >
                    <img
                    src={row.cameraPhotoLink || '/images/camera/defaultProfile.jpg'}
                    alt="Camera"
                    width={40}
                    height={40}
                    className="borRadius100"
                    />
                    <Box>
                    <Typography
                        as="h5"
                        sx={{
                        fontWeight: "500",
                        fontSize: "13.5px",
                        }}
                        className='ml-10px'
                    >
                        {row.name}
                    </Typography>
                    </Box>
                </Box>
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
                {row.email}
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
                            viewCamera(row._id);
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
                            deleteCameraFunc(row._id);
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
