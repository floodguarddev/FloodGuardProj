import React, { useEffect, useState } from 'react'
import { approveNgoRequest, getNgoRequestsList, rejectNgoRequest } from '../../services/ngos.services';
import { useUser } from "@/context/UserContext"
import { Box, CircularProgress, Typography } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {useSnackbar } from 'notistack';
import { useView } from '@/context/ViewContext';
import { useNavigate } from "react-router-dom";
import { jsonToSearchQuery } from '../../utils/query';

export const ViewNgoRequestList = ({setTotalRecords, rowsPerPage, query, handleEditOpen, ngoRequestsRefresh, setNgoRequestsRefresh}) => {

const navigate = useNavigate();
  const [userContext, setNgoRequestContext] = useUser();
  const [ngoRequestsList,setNgoRequestsList]=useState(null);
  const [emptyRows, setEmptyRows] = useState(rowsPerPage);
  const { enqueueSnackbar } = useSnackbar();
  const [viewContext, setViewContext] = useView();
  
  
  useEffect(()=>{
        if(!ngoRequestsRefresh)
            return;
        
        let searchQuery = jsonToSearchQuery(query);

        getNgoRequestsList(userContext.token, searchQuery).then(
            (response)=>{
                console.log("Response", response);
                return response.data.data;
            }
        ).then((data)=>{
            console.log(data);
            setTotalRecords(data.total);
            setNgoRequestsList(data.ngoRequests);
            setEmptyRows(rowsPerPage - data.ngoRequests.length) ;
            setNgoRequestsRefresh(false);
        }).catch((error)=>{
            enqueueSnackbar(error.message || error.response.data.message, { variant: "error", anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }  });
        })
  }, 
  [ngoRequestsRefresh])

  const viewNgoRequest = (ngoRequestId)=>{
    setViewContext((oldValues)=>{return {...oldValues, selectedNgoRequest: ngoRequestId}});
    navigate(`/ngos/requests/${ngoRequestId}`);
  }
  const approveNgoRequestFunc = (ngoRequestId) =>{
    approveNgoRequest(userContext.token, ngoRequestId).then(
        (response)=>{
            return response.data.message;
        }
    ).then((message)=>{
        setNgoRequestsRefresh(true);
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
  const deleteNgoRequestFunc = (ngoRequestId)=>{
    rejectNgoRequest(userContext.token, ngoRequestId).then(
        (response)=>{
            return response.data.message;
        }
    ).then((message)=>{
        setNgoRequestsRefresh(true);
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
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
            >
                Name
            </TableCell>

            
            <TableCell
                align="center"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
            >
                NGO ID
            </TableCell>

            <TableCell
                align="center"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
            >
                Contact Number
            </TableCell>

            <TableCell
                align="center"
                sx={{ borderBottom: "1px solid #F7FAFF", fontSize: "13.5px" }}
            >
                Address
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
            ngoRequestsList?
            <TableBody>
            {ngoRequestsList.map((row) => (
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
                    src={row.ngoImageLink || '/images/admin/defaultProfile.jpg'}
                    alt="NgoRequest"
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
                        {row.ngoName}
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
                {row.ngoId}
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
                {row.ngoContactNumber}
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
                {row.address}
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
                            viewNgoRequest(row._id);
                        }}
                    >
                        <VisibilityIcon fontSize="inherit" />
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Reject" placement="top">
                    <IconButton
                        aria-label="remove"
                        size="small"
                        color="danger"
                        className="danger"
                        onClick={()=>{
                            deleteNgoRequestFunc(row._id);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                    </Tooltip>

                    <Tooltip title="Accept" placement="top">
                    <IconButton
                        aria-label="edit"
                        size="small"
                        color="success"
                        className="primary"
                        onClick = {()=>{
                            approveNgoRequestFunc(row._id);
                        }}
                    >
                        <CheckIcon fontSize="inherit" />
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
