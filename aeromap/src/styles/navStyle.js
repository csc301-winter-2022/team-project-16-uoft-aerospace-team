const navBarStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 100,
    width: 125,
    borderRadius: 8,
    padding: '25px 0px',
    margin: '75px 10px',
}

const navLinkStyle = {
    textDecoration: 'none',
    color: 'white',
    display: 'block',
    height: 100,
    width: 100,
    borderStyle: 'solid',
    borderWidth: 'thick',
    borderRadius: 25,
    padding: 10,
    textAlign: 'center',
}

const inactiveNavLinkStyle = {
    ...navLinkStyle,
}

const activeNavLinkStyle = {
    ...navLinkStyle,
    filter: 'brightness(0) saturate(100%) invert(80%) sepia(36%) saturate(6958%) hue-rotate(1deg) brightness(104%) contrast(103%)',
}

export { navBarStyle ,inactiveNavLinkStyle, activeNavLinkStyle };

export { default as dashboardImg} from './Images/house.png';
export { default as plannerImg } from './Images/pin.png';
export { default as flightLogImg } from './Images/file.png';