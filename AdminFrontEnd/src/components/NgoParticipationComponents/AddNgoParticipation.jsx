import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { Autocomplete, Avatar, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addNews } from "@/services/news.services";
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';
import CloseIcon from "@mui/icons-material/Close"
import { NgoSearchBar } from "../SearchComponents/NgoSearchBar";
import { addNgoParticipation } from "../../services/ngo_participation.services";
import createFileList from "create-file-list";
export function AddNgoParticipation() {
  const [userContext, setUserContext] = useUser();
  const [images, setImages] = React.useState([]);
  const [postTitle, setTitle] = React.useState("");
  const [postDescription, setDescription] = React.useState("");
  const [ngoId, setNgoId] = React.useState("");

  const fileSelectedHandler = (event) => {
    console.log(event.target.files)
    let newImages = [...images, ...event.target.files];
    setImages(newImages);
  }

  // useEffect(()=>{
  //   async function getImages(imageUrl, imageName){
  //     let response = await fetch(imageUrl);
  //     let data = await response.blob();
  //     let metadata = {
  //       type: data.type
  //     };
  //     let file = new File([data], imageName, metadata);
  //     setImages([file]);
  //   }
  //   getImages();
  // }, [])

  const { enqueueSnackbar } =  useSnackbar();

  const addNgoParticipationFunc = async () => {

    try{
      let postImages = createFileList(images);
      console.log(postImages);
      let token = userContext.token;
      let formData = new FormData();
      formData.append('postTitle', postTitle);
      formData.append('postDescription', postDescription);
      images.forEach((image)=>{
        formData.append('postImages', image);
      })

      await addNgoParticipation(token, ngoId, formData);

      enqueueSnackbar("Ngo Post Has been added Successfully", { variant: "success" ,anchorOrigin: {
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
          Add NGO Participation Post
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
                        Select NGO
                    </Typography>
                    <NgoSearchBar setNgoId={setNgoId}/>
                    
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
                        Title
                    </Typography>

                    <TextField
                        fullWidth
                        id="postTitle"
                        name="postTitle"
                        autoComplete="family-name"
                        value={postTitle}
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
                        id="postTitle"
                        name="postTitle"
                        autoComplete="family-name"
                        value={postDescription}
                        onChange={(event)=>{
                        setDescription(event.target.value)
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
              addNgoParticipationFunc();
            }}
          >
            Add NGO Participation Post
          </Button>

        </Box>
      </Card>
    </>
  );
}
