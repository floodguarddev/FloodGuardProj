import React from 'react';
import { useLocation, Link } from "react-router-dom";
import styles from '@/components/Settings/NavBar.module.css'

const NavBar = () => {
  const location = useLocation();

  return (
    <>
      <nav className={styles.topNavStyle}>
        <ul>
          <li className={location.pathname == "/settings/account" ? styles.active : ""}>
            <Link to="/settings/account">
              Account
            </Link>
          </li>
          <li className={location.pathname == "/settings/security" ? styles.active : ""}>
            <Link to="/settings/security">
              Security
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar;