import React from "react";
import Card from "@mui/material/Card";
import { CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addNews } from "@/services/news.services";
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCircleOutlined';

export function AddNews() {
  const [userContext, setUserContext] = useUser();

  const [image, setImage] = React.useState(undefined);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [content, setContent] = React.useState("");
  const [url, setUrl] = React.useState("");
  const fileSelectedHandler = (event) => {
    setImage(event.target.files[0]);
  }

  const { enqueueSnackbar } =  useSnackbar();

  const addFloodPrecationsFunc = async (event) => {

    try{

      let token = userContext.token;
    
      let formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('author', author);
      formData.append('content', content);
      formData.append('url', url);
      formData.append('image', image);

      await addNews(token, formData);

      enqueueSnackbar("News Has been added Successfully", { variant: "success" ,anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      } });
      
      
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
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px'
          }}
        >
          Add News
        </Typography>
        
        

        <Box component="form" noValidate >
          <Box sx={{mb: "10px"}}>
            <Grid container alignItems="center" justifyContent="center" spacing={3}>

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
                      sx={{ height: 400 }}
                      image={image?URL.createObjectURL(image):'/images/default/no-img.png' }
                    />
                  </Box>
                </Grid>

            </Grid>
          </Box>
 
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "16px",
              padding: "12px 10px",
              color: "#fff !important",
            }}
            onClick={()=>{
              addFloodPrecationsFunc();
            }}
          >
            Create New Flood News
          </Button>

        </Box>
      </Card>
    </>
  );
}
