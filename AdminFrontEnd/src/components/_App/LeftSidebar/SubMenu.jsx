import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useHistory and useLocation from react-router-dom
import styles from "@/components/_App/LeftSidebar/SubMenu.module.css";


const SidebarLabel = styled("span")(({ theme }) => ({
  position: "relative",
  top: "-3px",
}));

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const [currentPath, setCurrentPath] = useState("");
  const navigate = useNavigate(); // Use useHistory instead of useRouter
  const location = useLocation(); // Use useLocation to get the current location

  useEffect(() => {
    setCurrentPath(location.pathname); // Use location.pathname instead of router.asPath
  }, [location]);

  return (
    <>
      <Link
        to={item.path} // Use "to" instead of "href"
        onClick={item.subNav && showSubnav}
        className={`${styles.sidebarLink} ${
          currentPath === item.path && "sidebarLinkActive" // Use "===" for comparison
        }`}
      >
        <div>
          {item.icon}
          <SidebarLabel className="ml-1">{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link
              to={item.path} // Use "to" instead of "href"
              key={index}
              className={`${styles.sidebarLink2} ${
                currentPath === item.path && "sidebarLinkActive2" // Use "===" for comparison
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu