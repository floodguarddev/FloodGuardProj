import React from 'react'
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import { addNgo } from "@/services/ngos.services";
import { useUser } from '@/context/UserContext';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'; 
import { PersonSelection } from './PersonSelection';
import { NgoDetails } from './NgoDetails';
import { DocumentsUpload } from './DocumentsUpload';


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

export default function AddNgo() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [userContext, setUserContext] = useUser();
    const { enqueueSnackbar } =  useSnackbar();
    //Person Selection//
    const [user, setUser] = React.useState(null);
    const [cnicNumber, setCnicNumber] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [associatedPersonStatus, setAssociatedPersonStatus] = React.useState("");
    //Ngo Details//
    
    const [ngoName, setNgoName] = React.useState("");
    const [ngoContactNumber, setNgoContactNumber] = React.useState("");
    const [creditCardNumber, setCreditCardNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [ngoId, setNgoId] = React.useState("");
    const [ngoImage, setNgoImage] = React.useState(null);
    //Document Upload//
    
    const [registrationCertificate, setRegistrationCertificate] = React.useState(null);
    const [annualReport, setAnnualReport] = React.useState(null);
    const [taxExemption, setTaxExemption] = React.useState(null);
    const [frontSideCNICImage, setFrontSideCNICImage] = React.useState(null);
    const [backSideCNICImage, setBackSideCNICImage] = React.useState(null);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const addNGOFunc = async ()=>{
            console.log('here')
            try{
              let formData = new FormData();
              //User
              formData.append('cnicNumber', cnicNumber);
              formData.append('mobileNumber', mobileNumber);
              formData.append('assosiatedPersonStatus', associatedPersonStatus);
              formData.append('frontSideCNIC', frontSideCNICImage)
              formData.append('backSideCNIC', backSideCNICImage)

              //Ngo
              formData.append('ngoName', ngoName);
              formData.append('ngoContactNumber', ngoContactNumber)
              formData.append('creditCardNumber', creditCardNumber)
              formData.append('address', address)
              formData.append('ngoId', ngoId)
              formData.append('ngoImage', ngoImage)
              
              //Documents
              formData.append('registrationCertificate', registrationCertificate);
              formData.append('annualReport', annualReport);
              formData.append('taxExemption', taxExemption);
        
              await addNgo(userContext.token, user, formData);
        
              enqueueSnackbar("Ngo Has been added Successfully", { variant: "success" ,anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
              } });
              
              handleReset();
            }
            catch(error)
            {
                enqueueSnackbar(error.response? error.response.data.message : error.message, { variant: "error", anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right'
                }  });
            }
    }

    const handleReset = () => {
    //Person Selection//
    setCnicNumber(null);
    setCnicNumber("");
    setMobileNumber("");
    setAssociatedPersonStatus("");
    //Ngo Details//
    setNgoName("");
    setNgoContactNumber("");
    setCreditCardNumber("");
    setAddress("");
    setNgoId("");
    //Document Upload//
    
    setRegistrationCertificate(null);
    setAnnualReport(null);
    setTaxExemption(null);
    setFrontSideCNICImage(null);
    setBackSideCNICImage(null);
      setActiveStep(0);
    };
    const steps = [
        {
          label: 'Assosciated Person Selection',
          component: <PersonSelection user = {user} setUser = {setUser} cnicNumber = {cnicNumber} setCnicNumber ={setCnicNumber} mobileNumber ={mobileNumber} setMobileNumber ={setMobileNumber} associatedPersonStatus= {associatedPersonStatus} setAssociatedPersonStatus= {setAssociatedPersonStatus}/>,
        },
        {
          label: 'NGO Details',
          component: <NgoDetails {...{ngoName, setNgoName, ngoContactNumber, setNgoContactNumber,creditCardNumber, setCreditCardNumber, address, setAddress, ngoId, setNgoId, ngoImage, setNgoImage}}/>,
        },
        {
          label: 'NGO Documents',
          component: <DocumentsUpload {...{setRegistrationCertificate, setAnnualReport, setTaxExemption, setFrontSideCNICImage, setBackSideCNICImage}}/>,
        },
    ];
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
            Add NGO
          </Typography>
  
          <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    {step.component}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={index === steps.length - 1 ?addNGOFunc:handleNext}
                          sx={{ mt: 1 }}
                          className="mr-1 whiteColor"
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1 }}
                          className="mr-1"
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }} className="bg-black">
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1 }} className="mr-1">
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        </Card>
      </>
    );
}
