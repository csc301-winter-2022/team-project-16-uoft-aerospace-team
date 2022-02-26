import { NavLink, Routes, Route,} from 'react-router-dom';

import Plots from './Plots';
import Dash from './Dash';
import Log from './Log';
import { activeNavBarStyle ,inactiveNavBarStyle } from '../styles/navBarStyle';

const NavBar = () => {
    const style = ({ isActive }) => isActive ? activeNavBarStyle : inactiveNavBarStyle

    return(
        <div>
            <NavLink to="/" style={style}> Dashboard </NavLink>
            <NavLink to="/plots" style={style}> Flight Planner </NavLink>
            <NavLink to="/logs" style={style}>  Flight Log  </NavLink>
            
            <Routes> 
                <Route path="/" exact element={<Dash/>}/>
                <Route path="/plots" exact element={<Plots/>}/>
                <Route path="/logs" exact element={<Log/>}/>
            </Routes>
        </div>
    );
}

export default NavBar;