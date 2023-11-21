import './styles/remixicon.css'
import 'react-tabs/style/react-tabs.css';
import "swiper/css";
import "swiper/css/bundle";
//Map CSS
import 'mapbox-gl/dist/mapbox-gl.css';
// Chat Styles
import './styles/chat.css'
// Globals Styles
import './styles/globals.css'
// Rtl Styles
import './styles/rtl.css'
// Dark Mode Styles
import './styles/dark.css'
// Theme Styles
import theme from './styles/theme'

import { ThemeProvider, CssBaseline } from "@mui/material";
import Layout from "./components/_App/Layout";

import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from "./context/UserContext"
import {Routes, Route,Navigate  } from "react-router-dom";
// import './App.css'
//Pages//
import SignIn from './pages/auth/SignIn';
import ForgotPasswordForm from './pages/auth/ForgotPassword';
import ConfirmMail from './pages/auth/ConfirmMail'
import ResetPassword from './pages/auth/ResetPassword'

//General
import Loader from './pages/general/Loader'
import NotFound from './pages/general/NotFound'
import Logout from './pages/auth/Logout'
import Account from './pages/settings/Account';
import Security from './pages/settings/Security';
import Dashboard from './pages/dashboard/Dashboard'
//Users
import UsersList from './pages/users/UsersList'
import AddUserPage from './pages/users/AddUserPage';
import ViewUserProfile from './pages/users/ViewUserProfile';

//Admin
import AdminsList from './pages/admins/AdminsList';
import AddAdminPage from './pages/admins/AddAdminPage';
import ViewAdminProfile from './pages/admins/ViewAdminProfile';

//Flood Precautions
import FloodPrecautionsList from './pages/flood_precautions/FloodPrecautionsList';
import AddFloodPrecautionsPage from './pages/flood_precautions/AddFloodPrecautionsPage';
import ViewSpecificFloodPrecaution from './pages/flood_precautions/ViewSpecificFloodPrecaution';
//News
import NewsList from './pages/news/NewsList';
import AddNewsPage from './pages/news/AddNewsPage';
import ViewSpecificNews from './pages/news/ViewSpecificNews';

//NgoParticipation
import NgoPartcipationsList from './pages/ngo_participation/NgoParticipationList';
import AddNgoPartcipationPage from './pages/ngo_participation/AddNgoParticipationPage';
import ViewSpecificNgoPartcipation from './pages/ngo_participation/ViewSpecificNgoParticipation';
import NgoPartcipationRequestsList from './pages/ngo_participation/NgoPartcipationRequestsList';

//Fund Raising
import FundRaisingRequestsList from './pages/fund_raisings/FundRaisingRequestsList';
import AddFundRaisingPage from "./pages/fund_raisings/AddFundRaising";
import ViewSpecificFundRaising from './pages/fund_raisings/ViewSpecificFundRaising';
import FundRaisingsList from './pages/fund_raisings/FundRaisingList';
import RescuersList from './pages/rescuers/RescuersList';
import RescuerRequestsList from './pages/rescuer_requests/RescuerRequestsList';
import AddRescuerPage from './pages/rescuers/AddRescuerPage';
import ViewRescuer from './pages/rescuers/ViewRescuer';
import NgosList from './pages/ngos/NgosList';
import NgoRequestsList from './pages/ngo_requests/NgoRequestsList';
import AddNgoPage from './pages/ngos/addNgoPage';
import ViewNgo from './pages/ngos/ViewNgo';
import ViewRescuerRequest from './pages/rescuer_requests/ViewRescuerRequest';
import ViewNgoRequest from './pages/ngo_requests/ViewNgoRequest';

//Flood
import AddFloodPage from './pages/floods/AddFloodPage';
import DangerZonesPage from './pages/floods/DangerZonesPage'
import FloodsListPage from './pages/floods/FloodsListPage'
import { AddCamera } from './components/CameraComponents/AddCamera';
import AddCameraPage from './pages/cameras/AddCameraPage';
import CamerasListPage from './pages/cameras/CamerasListPage';

function App() {
  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch("http://localhost:80/"+ "admins/refreshTokenCall", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, 
            id: data.data.admin._id,
            token: data.data.token, 
            adminPhotoLink: data.data.admin.adminPhotoLink||'/images/admin/defaultProfile.jpg',
            name: data.data.admin.name,
            email: data.data.admin.email
          }
        })
      } else {
        setUserContext(oldValues => {
          console.log(userContext)
          return { ...oldValues, token: null, }
        })
      }
      // call refreshToken every 60 minutes to renew the authentication token.
      setTimeout(verifyUser, 60 * 60 * 1000)
    })
  }, [setUserContext])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
          {userContext.token === null ? (
                <Routes>
                  <Route path="/">
                    <Route path='/' element={ <Navigate to="/sign_in" /> }/>
                    <Route path="sign_in" element={<SignIn />} />
                    <Route path="forgot_password" element={<ForgotPasswordForm />} />
                    <Route path="confirm_mail" element={<ConfirmMail/>}/>
                    <Route path="reset_password" element={<ResetPassword/>} />
                    <Route path="logout" element={<Logout/>} />
                    <Route path='*' element={<NotFound/>} />
                  </Route>
                </Routes>
            ): userContext.token ? (
              <Layout>
                <Routes >
                  <Route path="logout" element={<Logout/>} />
                  <Route path = '/'>
                    <Route path="/" element={<Navigate to="/dashboard" />}/>
                    <Route path='/dashboard' element={<Dashboard />}/>
                  </Route>
                  <Route path='/settings'>
                    <Route path='/settings/account' element={<Account/>}/>
                    <Route path='/settings/security' element={<Security/>}/>
                  </Route>
                  <Route path="/users">
                    <Route path="/users" element={<Navigate to="/users/list" />}/>
                    <Route path='/users/list' element={<UsersList/>}/>
                    <Route path='/users/add' element={<AddUserPage/>}/>
                    <Route path='/users/:id' element={<ViewUserProfile/>}/>
                  </Route>
                  <Route path="/admins">
                    <Route path="/admins" element={<Navigate to="/admins/list" />}/>
                    <Route path='/admins/list' element={<AdminsList />}/>
                    <Route path='/admins/add' element={<AddAdminPage />}/>
                    <Route path='/admins/:id' element={<ViewAdminProfile />}/>
                  </Route>
                  <Route path="/flood_precautions">
                    <Route path="/flood_precautions" element={<Navigate to="/flood_precautions/list" />}/>
                    <Route path='/flood_precautions/list' element={<FloodPrecautionsList />}/>
                    <Route path='/flood_precautions/add' element={<AddFloodPrecautionsPage />}/>
                    <Route path='/flood_precautions/:id' element={<ViewSpecificFloodPrecaution />}/>
                  </Route>
                  <Route path="/news">
                    <Route path="/news" element={<Navigate to="/news/list" />}/>
                    <Route path='/news/list' element={<NewsList />}/>
                    <Route path='/news/add' element={<AddNewsPage />}/>
                    <Route path='/news/:id' element={<ViewSpecificNews />}/>
                  </Route>
                  <Route path="/ngo_participations">
                    <Route path="/ngo_participations" element={<Navigate to="/ngo_participations/list" />}/>
                    <Route path='/ngo_participations/list' element={<NgoPartcipationsList />}/> 
                    <Route path='/ngo_participations/requests' element={<NgoPartcipationRequestsList />}/>
                    <Route path='/ngo_participations/add' element={<AddNgoPartcipationPage />}/>
                    <Route path='/ngo_participations/:id' element={<ViewSpecificNgoPartcipation />}/>
                  </Route>
                  <Route path="/fund_raisings">
                    <Route path="/fund_raisings" element={<Navigate to="/fund_raisings/list" />}/>
                    <Route path='/fund_raisings/list' element={<FundRaisingsList />}/> 
                    <Route path='/fund_raisings/requests' element={<FundRaisingRequestsList />}/>
                    <Route path='/fund_raisings/add' element={<AddFundRaisingPage />}/>
                    <Route path='/fund_raisings/:id' element={<ViewSpecificFundRaising />}/>
                  </Route>
                  <Route path="/rescuers">
                    <Route path="/rescuers" element={<Navigate to="/rescuers/list" />}/>
                    <Route path='/rescuers/list' element={<RescuersList />}/> 
                    <Route path='/rescuers/requests' element={<RescuerRequestsList />}/>
                    <Route path ='/rescuers/requests/:id' element={<ViewRescuerRequest/>}/>
                    <Route path='/rescuers/add' element={<AddRescuerPage />}/>
                    <Route path='/rescuers/:id' element={<ViewRescuer />}/>
                  </Route>
                  <Route path="/ngos">
                    <Route path="/ngos" element={<Navigate to="/ngos/list" />}/>
                    <Route path='/ngos/list' element={<NgosList />}/> 
                    <Route path='/ngos/requests' element={<NgoRequestsList />}/>
                    <Route path ='/ngos/requests/:id' element={<ViewNgoRequest/>}/>
                    <Route path='/ngos/add' element={<AddNgoPage />}/>
                    <Route path='/ngos/:id' element={<ViewNgo />}/>
                  </Route>
                  <Route path="/floods">
                    <Route path="/floods" element={<Navigate to="/floods/dangerzones" />}/>
                    <Route path="/floods/add" element={<AddFloodPage />}/>
                    <Route path='/floods/dangerzones' element={<DangerZonesPage />}/> 
                    <Route path='/floods/list' element={<FloodsListPage/>}/>
                  </Route>
                  <Route path="/cameras">
                    <Route path="/cameras" element={<Navigate to="/cameras/list" />}/>
                    <Route path="/cameras/add" element={<AddCameraPage />}/>
                    <Route path='/cameras/list' element={<CamerasListPage />}/>
                  </Route>
                  <Route path='*' element={<NotFound/>} />
                </Routes>
              </Layout>
            ) : (
              <Loader />
            )}
    </ThemeProvider>
    
  )
}

export default App
