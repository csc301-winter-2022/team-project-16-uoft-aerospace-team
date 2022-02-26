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
    color: 'orange',
}

export { navBarStyle ,inactiveNavLinkStyle, activeNavLinkStyle };