const navBarStyle = {
    textDecoration: 'none',
    display: 'block',
    minHeight: 100,
    width: 100,
    borderStyle: 'solid',
    borderRadius: 8,
    margin: 50,
}

const inactiveNavBarStyle = {
    ...navBarStyle,
}

const activeNavBarStyle = {
    ...navBarStyle,
    color: 'orange',
}

export {inactiveNavBarStyle, activeNavBarStyle};