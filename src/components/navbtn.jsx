import React from 'react';
import { Link } from "react-router-dom";

const NavButton = ({children, to, customClass}) => (
  <div name={customClass ||'menubtn'}>
    <Link className={'nextTo'} style={{color: '#fff', textDecoration: 'none'}} to={to || "#"}>{children || "Not defined"}</Link>
  </div>
)

export default NavButton;