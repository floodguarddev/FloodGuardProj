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
import { editNews } from '@/services/news.services';


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


const EditNews  = ({news, setNews, handleClose, open}) => {
  const [userContext, setUserContext] = useUser();

  const [image, setImage] = useState(undefined);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");
  const [url, setUrl] = React.useState("");

  const fileSelectedHandler = (event) => {
    setImage(event.target.files[0]);
  }

  const { enqueueSnackbar } =  useSnackbar();

  useEffect(()=>{
    if(news){
        setTitle(news.title);
        setDescription(news.description);
        setAuthor(news.author);
        setContent(news.content);
        setUrl(news.url);
    }
  }, [news])

  const updateNewsFunction = async (event) => {

    try{
      let token = userContext.token;
    
      let formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('author', author);
      formData.append('content', content);
      formData.append('url', url);
      formData.append('image', image);

      let response = await editNews(token, news._id, formData);
      
      let editdNews = await response.data.data.news;
      setNews(editdNews);
      enqueueSnackbar("News Has been Updated Successfully", { variant: "success" ,anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      } });
      handleClose();
    }
    catch(error)
    {
        console.log(error);
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
              Update News
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
                        value={title}
                        onChange={(event)=>{
                        setTitle(event.target.value)
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
                        value={description}
                        onChange={(event)=>{
                        setDescription(event.target.value)
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
                        Author
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={author}
                        onChange={(event)=>{
                        setAuthor(event.target.value)
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
                        Content
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={content}
                        onChange={(event)=>{
                        setContent(event.target.value)
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
                        Url
                    </Typography>

                    <TextField
                        multiline
                        fullWidth
                        id="title"
                        name="title"
                        autoComplete="family-name"
                        value={url}
                        onChange={(event)=>{
                        setUrl(event.target.value)
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
                    Upload Image
                  </Typography>
                  
                  <TextField
                    required
                    fullWidth
                    name="file"
                    type="file"
                    id="file"
                    onChange={fileSelectedHandler}
                    autoComplete="file"
                  />

                  <Box mt={1}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image={image?URL.createObjectURL(image):(news && news.imageUrl)?news.imageUrl:'/images/admin/defaultProfile.jpg' }
                    />
                  </Box>
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
                        updateNewsFunction();
                    }}
                  >
                    <AddIcon
                      sx={{
                        position: "relative",
                        top: "-2px",
                      }}
                      className='mr-3px'
                    />{" "}
                    Update News
                  </Button>
                </Grid>
            </Grid>

            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
  )
}

export default EditNews;