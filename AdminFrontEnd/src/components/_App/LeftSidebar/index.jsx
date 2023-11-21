import React from 'react';
import {
  Box
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SubMenu from './SubMenu';
import { Link} from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useView } from '../../../context/ViewContext';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FeedIcon from '@mui/icons-material/Feed';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const SidebarNav = styled("nav")(({ theme }) => ({
  background: '#fff',
  boxShadow: "0px 4px 20px rgba(47, 143, 232, 0.07)",
  width: '300px',
  padding: '30px 10px',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  transition: '350ms',
  zIndex: '10',
  overflowY: 'auto'
}));
 
const SidebarWrap = styled("div")(({ theme }) => ({
  width: '100%'
}));

const Sidebar = ({ toogleActive }) => {
  const [viewContext, setViewContext] = useView();
  
  let sideBarData = [
    {
      title: "Dashboard",
      path: "/",
      icon: <GridViewIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />
    },
    {
      title: "Admins",
      path: "/admins/",
      icon: <SupervisorAccountIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Admins List",
          path: "/admins/list",
        },
        {
          title: "View Admin",
          path: "/admins/"+viewContext.selectedAdmin
        },
        {
          title: "Add Admin",
          path: "/admins/add"
        }
      ],
    },
    {
      title: "Users",
      path: "/users/",
      icon: <PersonIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Users List",
          path: "/users/list",
        },
        {
          title: "View User",
          path: "/users/"+viewContext.selectedUser
        },
        {
          title: "Add User",
          path: "/users/add"
        }
      ],
    },
    {
      title: "Cameras",
      path: "/cameras/",
      icon: <ReportGmailerrorredIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Add Camera",
          path: "/cameras/add"
        },
        {
          title: "View Cameras",
          path: "/cameras/list"
        }
      ],
    },
    {
      title: "Flood",
      path: "/floods/",
      icon: <ReportGmailerrorredIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Add Flood",
          path: "/floods/add"
        },
        {
          title: "Danger Zones",
          path: "/floods/dangerzones",
        },
        {
          title: "View Floods",
          path: "/floods/list"
        }
      ],
    },
    {
      title: "Flood Precautions",
      path: "/flood_precautions/",
      icon: <ReportGmailerrorredIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Precautions List",
          path: "/flood_precautions/list",
        },
        {
          title: "View Precaution",
          path: "/flood_precautions/"+viewContext.selectedFloodPrecaution
        },
        {
          title: "Add Precaution",
          path: "/flood_precautions/add"
        }
      ],
    },
    {
      title: "News",
      path: "/news/",
      icon: <FeedIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "News List",
          path: "/news/list",
        },
        {
          title: "View News",
          path: "/news/"+viewContext.selectedNews
        },
        {
          title: "Add News",
          path: "/news/add"
        }
      ],
    },
    {
      title: "NGO Participation",
      path: "/ngo_participations/",
      icon: <PostAddIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Posts List",
          path: "/ngo_participations/list",
        },
        {
          title: "View Post",
          path: "/ngo_participations/"+viewContext.selectedNgoParticipation
        },
        {
          title: "Add Post",
          path: "/ngo_participations/add"
        },
        {
          title: "Post Requests",
          path: "/ngo_participations/requests"
        }
      ],
    },
    {
      title: "Fund Raising",
      path: "/fund_raisings/",
      icon: <VolunteerActivismIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Posts List",
          path: "/fund_raisings/list",
        },
        {
          title: "View Post",
          path: "/fund_raisings/"+viewContext.selectedFundRaising
        },
        {
          title: "Add Post",
          path: "/fund_raisings/add"
        },
        {
          title: "Post Requests",
          path: "/fund_raisings/requests"
        }
      ],
    },
    {
      title: "NGOs",
      path: "/ngos/",
      icon: <PrivacyTipIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "NGOs List",
          path: "/ngos/list",
        },
        {
          title: "View Ngo",
          path: "/ngos/"+viewContext.selectedNgo
        },
        {
          title: "Add NGO",
          path: "/ngos/add"
        },
        {
          title: "NGO Requests",
          path: "/ngos/requests"
        },
        {
          title: "View NGO Request",
          path: "/ngos/requests/"+viewContext.selectedNgoRequest
        }
      ],
    },
    {
      title: "Rescuers",
      path: "/rescuers/",
      icon: <LocalHospitalIcon />,
      
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Rescuers List",
          path: "/rescuers/list",
        },
        {
          title: "View Rescuer",
          path: "/rescuers/"+viewContext.selectedRescuer
        },
        {
          title: "Add Rescuer",
          path: "/rescuers/add"
        },
        {
          title: "Rescuer Requests",
          path: "/rescuers/requests"
        },
        {
          title: "View Rescuer Request",
          path: "/rescuers/requests/"+viewContext.selectedRescuerRequest
        }
      ],
    },
    {
      title: "Notification",
      path: "/notification/",
      icon: <NotificationsNoneIcon />,
    },
    {
      title: "Settings",
      path: "/settings/account/",
      icon: <SettingsIcon />,
      iconClosed: <KeyboardArrowRightIcon />,
      iconOpened: <KeyboardArrowDownIcon />,
  
      subNav: [
        {
          title: "Account",
          path: "/settings/account/",
        },
        {
          title: "Security",
          path: "/settings/security/",
        },
        {
          title: "Logout",
          path: "/logout/",
        },
      ],
    },
  ]

  return (
    <>
      <div className='leftSidebarDark'>
        <SidebarNav className="LeftSidebarNav">
          <SidebarWrap>
            <Box 
              sx={{ 
                mb: '20px',
                px: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Link to='/'>
                <img 
                  src="/images/logo.png" alt="Logo" 
                  className='black-logo' 
                />

                {/* For Dark Variation */}
                <img 
                  src="/images/logo-white.png" alt="Logo" 
                  className='white-logo' 
                />
              </Link>

              <IconButton 
                onClick={toogleActive} 
                size="small"
                sx={{
                  background: 'rgb(253, 237, 237)',
                  display: { lg: 'none' }
                }}
              >
                <ClearIcon />
              </IconButton>
            </Box>

            {sideBarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </div>
    </>
  );
};

export default Sidebar;
