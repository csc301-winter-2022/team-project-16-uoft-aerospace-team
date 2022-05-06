import { NavLink } from 'react-router-dom';

import {
    navBarStyle, activeNavLinkStyle, inactiveNavLinkStyle,
    dashboardImg, logImg, siteImg, flightImg, 
    DashboardImgStyle, siteImgStyle, flightImgStyle, logImgStyle,
    } from '../styles/NavBar';

const NavBar = () => {
    const navLinkStyle = ({ isActive }) => 
        isActive ? activeNavLinkStyle : inactiveNavLinkStyle;

    return(
        <div style={navBarStyle}>
            <NavLink to="/" style={navLinkStyle}> <img src={dashboardImg} style={DashboardImgStyle} alt='Dashboard Icon'/> </NavLink>
            <NavLink to="/add-site" style={navLinkStyle}> <img src={siteImg} style={siteImgStyle} alt='Site Icon'/> </NavLink>
            <NavLink to="/add-flight" style={navLinkStyle}> <img src={flightImg} style={flightImgStyle} alt='Flight Icon'/> </NavLink>
            <NavLink to="/info" style={navLinkStyle}> <img src={logImg} style={logImgStyle} alt='Logs Icon'/>  </NavLink>
        </div>
    );
}

export default NavBar;