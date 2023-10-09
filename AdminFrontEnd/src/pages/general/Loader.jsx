import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import './loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="logo">
        {/* Place your logo here */}
        <img src="/images/favicon.png" alt="Logo" />
      </div>
      <p className="please-wait">Please Wait...</p>
      <div className="loader">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;