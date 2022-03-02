import { NavLink } from 'react-router-dom';

import {
    navBarStyle, activeNavLinkStyle, inactiveNavLinkStyle,
    dashboardImg, LogImg, SiteImg, FlightImg} from '../styles/navStyle';

const NavBar = () => {
    const navLinkStyle = ({ isActive }) => 
        isActive ? activeNavLinkStyle : inactiveNavLinkStyle;

    return(
        <div style={navBarStyle}>
            <NavLink to="/" style={navLinkStyle}> <img src={dashboardImg} alt='Dashboard Icon'/> </NavLink>
            <NavLink to="/add-site" style={navLinkStyle}> <img src={SiteImg} alt='Site Icon'/> </NavLink>
            <NavLink to="/add-flight" style={navLinkStyle}> <img src={FlightImg} alt='Flight Icon'/> </NavLink>
            <NavLink to="/log" style={navLinkStyle}> <img src={LogImg} alt='Logs Icon'/>  </NavLink>
        </div>
    );
}

export default NavBar;