import React, { useEffect, useState } from 'react'
import { Box, CardMedia, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close'; 
import { editUser } from '@/services/users.services';
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCircleOutlined';
import { editNgoParticipation } from '../../services/ngo_participation.services';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const EditNgoParticipation  = ({ngoParticipation, setNgoParticipation, handleClose, open}) => {
  const [userContext, setUserContext] = useUser();
  const [images, setImages] = React.useState([]);
  const [postTitle, setPostTitle] = React.useState("");
  const [postDescription, setPostDescription] = React.useState("");
  const [ngoId, setNgoId] = React.useState("");
  const [ngoName, setNgoName] = React.useState("");
  const [postId, setPostId] = React.useState(null);
  const fileSelectedHandler = (event) => {
    console.log(event.target.files)
    let newImages = [...images, ...event.target.files];
    setImages(newImages);
  }

  const { enqueueSnackbar } =  useSnackbar();

  useEffect(()=>{
    async function getImages(imageUrl, imageName){
      let response = await fetch(imageUrl);
      let data = await response.blob();
      let metadata = {
        type: data.type
      };
      let file = new File([data], imageName, metadata);
      return file
    }

    async function getImagesArray(imagesArray){
      let prevImages = [];
      for(let i = 0; i<imagesArray.length; i++){
        let prevImage = await getImages(imagesArray[i], `imageIndex-${i}`);
        prevImages.push(prevImage);
      }
      return prevImages;
    }

    if(ngoParticipation){
        console.log(ngoParticipation);
        setPostTitle(ngoParticipation.postTitle);
        setPostDescription(ngoParticipation.postDescription);
        setNgoId(ngoParticipation.ngoId);
        setNgoName(ngoParticipation.ngoName);
        setPostId(ngoParticipation._id);
        getImagesArray(ngoParticipation.postImagesLinks).then((prevImages)=>{
          setImages(prevImages);
        })
    }
  }, [ngoParticipation])

  const updateNgoParticipationFunction = async (event) => {

    try{
      let token = userContext.token;
      let formData = new FormData();
      formData.append('postTitle', postTitle);
      formData.append('postDescription', postDescription);
      images.forEach((image)=>{
        formData.append('postImages', image);
      })

      let response = await editNgoParticipation(token, ngoId, postId, formData);

      
      let editedPost = await response.data.data.news;

      setNgoParticipation(editedPost);

      enqueueSnackbar("Ngo Participation Post Has been Updated Successfully", { variant: "success" ,anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      } });

      handleClose();
    }
    catch(error)
    {
        enqueueSnackbar(error.response? error.response.data.message : error.message, { variant: "error", anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }  });
    }
    
  }

  return (
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#EDEFF5",
              borderRadius: "8px",
              padding: "20px 20px",
            }}
            className="bg-black"
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              Update NGO Participation
            </Typography>

            <IconButton
              aria-label="remove"
              size="small"
              onClick={handleClose}
              className="modal-close"
            >
              <ClearIcon />
            </IconButton>
          </Box>

          <Box component="form" noValidate >
            <Box
              sx={{
                background: "#fff",
                padding: "20px 20px",
                borderRadius: "8px",
              }}
              className="dark-BG-101010"
            >
        <Grid container alignItems="center" spacing={2}>   
        <Grid item xs={12}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Title
                    </Typography>

                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={postTitle}
                        onChange={(event)=>{
                        setPostTitle(event.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        component="label"
                        sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "10px",
                        display: "block",
                        }}
                    >
                        Description
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={postDescription}
                        onChange={(event)=>{
                        setPostDescription(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    
                    variant="contained"
                    sx={{
                    mt: 2,
                    mb: 2,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "14px",
                    padding: "6px 6px",
                    color: "#fff !important",
                  }} component="label">Add Images
                    <input
                      required
                      fullWidth
                      multiple
                      name="files"
                      type="file"
                      id="files"
                      hidden
                      onChange={fileSelectedHandler}
                      autoComplete="file"
                    />
                  </Button>
                  <Grid container alignItems="center" justifyContent="center" spacing={3}>
                  {images.map((image, index)=>{
                    return (
                      <Grid item mt = {2} xs = {6} md = {6} lg = {4}>
                          <Box position="relative">
                            <IconButton
                              style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Background color for the button
                              }}
                              onClick={()=>{
                                console.log('here');
                                let newImages = [...images]
                                newImages.splice(index, index?index:index+1);
                                setImages(newImages)
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                            <CardMedia
                              sx={{ height: 300, borderRadius:5, boxShadow: 4 }}
                              image={URL.createObjectURL(image)}
                              
                            />
                          </Box>
                      </Grid>
                    )
                  })}
                  </Grid>
                  
                </Grid>
                <Grid item xs={12} textAlign="end">
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important"
                    }}
                    onClick={handleClose}
                    className='mr-15px'
                  >
                    <ClearIcon
                      sx={{
                        position: "relative",
                        top: "-1px",
                      }}
                      className='mr-3px'
                    />{" "}
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 1,
                      textTransform: "capitalize",
                      borderRadius: "8px",
                      fontWeight: "500",
                      fontSize: "13px",
                      padding: "12px 20px",
                      color: "#fff !important"
                    }}
                    onClick = {()=>{
                        updateNgoParticipationFunction();
                    }}
                  >
                    <AddIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className='mr-3px'
                    />{" "}
                    Update NgoParticipation
                  </Button>
                </Grid>
            </Grid>

            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
  )
}

export default EditNgoParticipation;