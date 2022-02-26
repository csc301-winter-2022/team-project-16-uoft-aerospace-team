import NavButton from "./NavButton";
import {Link} from 'react-router-dom';

const NavBar = () => {
    return(
        <div>
            <Link to="/"> <NavButton text='Dashboard' /> </Link>
            <Link to="/plots"> <NavButton text='Flight Planner' /> </Link>
            <Link to="/logs"> <NavButton text='Flight Log' /> </Link>
        </div>
    );
}

export default NavBar;