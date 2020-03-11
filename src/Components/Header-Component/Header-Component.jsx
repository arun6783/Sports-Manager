import React from "react";
import { Link } from "react-router-dom";

import "./Header-Component.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" />
    </div>
  );
};

export default Header;
