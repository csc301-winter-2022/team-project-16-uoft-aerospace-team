import { NavLink } from 'react-router-dom';

import { navBarStyle, activeNavLinkStyle, inactiveNavLinkStyle} from '../styles/navStyle';

const NavBar = () => {
    const navLinkStyle = ({ isActive }) =>
        isActive ? activeNavLinkStyle : inactiveNavLinkStyle;

    return(
        <div style={navBarStyle}>
            <NavLink to="/" style={navLinkStyle}> Dashboard </NavLink>
            <NavLink to="/PlannerPage" style={navLinkStyle}> Flight Planner </NavLink>
            <NavLink to="/FlightLogPage" style={navLinkStyle}>  Flight Log  </NavLink>
        </div>
    );
}

export default NavBar;