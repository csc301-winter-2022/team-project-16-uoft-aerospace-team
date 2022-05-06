const navBarStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 100,
    width: 125,
    borderRadius: 8,
    padding: '25px 0px',
    margin: '10px 10px',
}

const navLinkStyle = {
    textDecoration: 'none',
    color: 'white',
    display: 'block',
    height: 80,
    width: 80,
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

const DashboardImgStyle = {
    height: 75,
    width: 75,
}

const siteImgStyle = {
}

const flightImgStyle = {
    height: 80,
    width: 80,
}

const logImgStyle = {
    height: 80,
}

export { navBarStyle ,inactiveNavLinkStyle, activeNavLinkStyle, 
        DashboardImgStyle , siteImgStyle, flightImgStyle, logImgStyle };

export { default as dashboardImg} from './Images/house.png';
export { default as siteImg } from './Images/pin.png';
export { default as flightImg } from './Images/plane.png' 
export { default as logImg } from './Images/file.png';