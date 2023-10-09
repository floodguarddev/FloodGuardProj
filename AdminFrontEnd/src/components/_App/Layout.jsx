import React, { useState } from "react";
import { HeadProvider, Title, Meta } from "react-head";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LeftSidebar from "@/components/_App/LeftSidebar";
import TopNavbar from "@/components/_App/TopNavbar";
import Footer from "@/components/_App/Footer";
import ScrollToTop from "./ScrollToTop";
import ControlPanelModal from "./ControlPanelModal";

const Layout = ({ children }) => {
  const location = useLocation();

  const [active, setActive] = useState(false);

  const toogleActive = () => {
    setActive(!active);
  };

  return (
    <>
      <HeadProvider>
        <Title>
          Admash - Material Design React Next Admin Dashboard Template
        </Title>
        <Meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </HeadProvider>

      <div className={`main-wrapper-content ${active && "active"}`}>
          
          {
          (location.pathname != '/logout/')&&
          
           ( <>
            <TopNavbar toogleActive={toogleActive} />

            <LeftSidebar toogleActive={toogleActive} />
            </>)
          }
          

        <div className="main-content">
          {children}
          {
          (location.pathname != '/logout/')&&
          (
           <Footer />)
          }
        </div>
      </div>
            
      {/* ScrollToTop */}
      <ScrollToTop />
      
      
        <ControlPanelModal />
    </>
  );
};

export default Layout;
