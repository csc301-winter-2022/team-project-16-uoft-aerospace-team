const barContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
}

const contentContainerStyle = {
    display: 'flex',
    textAlign: 'center'
}

const timeContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'coral',
    width: 200,
    height: 100,
    border: '0px solid burlywood',
    borderRadius: 30,
    fontSize: 25,
    letterSpacing: 2,
}

const dateContainerStyle = {
    margin: 7
}

const hourContainerStyle = {
    margin: 7
}

const detailsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
}

const detailsTextContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    width: 600,
    height: 100,
    color: 'coral',
    fontSize: 40,
}

const toolsContainerStyle = {
    width: 100,
}

const linkContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    width: 100,
    height: 30,
    fontWeight: 600,
    border: '1px solid coral',
    fontStyle: 'italic',
}

const detailsLinkStyle = {
    color: 'coral',
    textDecoration: 'none',
}

const underlineContainerStyle= {

}

const underlineStyle = {
    position: 'relative',
    top: -10,
    margin: '0px 0px 0px 30px',
    width: 'calc(90% - 5px)', 
    border: "5px solid coral",
    borderRadius: 30,
}

const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'coral',
    marginTop: 15,
    width: 100,
    height: 30,
    border: '1px solid coral',
    cursor: 'pointer',
    fontStyle: 'italic',
    fontWeight: 600,
    fontSize: 15,
    fontFamily: 'Times New Roman'
}

export {
    barContainerStyle,
    contentContainerStyle,
    timeContainerStyle,
    dateContainerStyle,
    hourContainerStyle,
    detailsContainerStyle,
    detailsTextContainerStyle,
    toolsContainerStyle,
    linkContainerStyle,
    detailsLinkStyle,
    underlineContainerStyle,
    underlineStyle,
    buttonStyle,
}