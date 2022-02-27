import { NavLink } from 'react-router-dom';

import {
    navBarStyle, activeNavLinkStyle, inactiveNavLinkStyle,
    dashboardImg, plannerImg, flightLogImg} from '../styles/navStyle';

const NavBar = () => {
    const navLinkStyle = ({ isActive }) => 
        isActive ? activeNavLinkStyle : inactiveNavLinkStyle;

    return(
        <div style={navBarStyle}>
            <NavLink to="/" style={navLinkStyle}> <img src={dashboardImg} alt='Dashboard Icon'/> </NavLink>
            <NavLink to="/PlannerPage" style={navLinkStyle}> <img src={plannerImg} alt='Planner Icon'/> </NavLink>
            <NavLink to="/FlightLogPage" style={navLinkStyle}> <img src={flightLogImg} alt='Flight Logs Icon'/>  </NavLink>
        </div>
    );
}

export default NavBar;