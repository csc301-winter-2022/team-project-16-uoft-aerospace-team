const formStyle = {
    margin: '50px',
    marginLeft: '100px',
}

const containerStyle = {
    margin: '20px',
    display: 'flex',
    justifyContent: 'row',
}

const textStyle = {
    display : 'flex',
    alignItems : 'center',
    width: '400px',
    fontSize: '25px',
    color: "white",
}

const inputStyle = {
    padding: '5px 5px 5px 15px', 
    fontSize: '20px', 
    width: '200px',
    borderRadius: '8px',
    border: '2px solid white',
}

const selectWrapperStyle = {
    width: 225,
}

const initialPilotContainerStyle = {
    marginLeft: '420px',
}

const pilotsContainerStyle = {
    display: 'flex',
    justifyContent: 'row',
    margin: '10px',
    marginLeft: '420px',
}

const imgStyle = {
    height: 30,
    width: 30,
    filter: 'invert(100%)',
    cursor: 'pointer'
}

const removeContainerStyle = {
    margin: 15,
}

const textAreaStyle = {
    width: 620,
    height: 100,
    fontWeight: 'bold',
    fontSize: 16
}

const buttonContainerStyle = {
    marginTop: 40,
    marginLeft: 300,
}


export {
    formStyle, containerStyle, 
    textStyle, inputStyle, selectWrapperStyle, initialPilotContainerStyle, 
    pilotsContainerStyle, imgStyle, removeContainerStyle, textAreaStyle,
    buttonContainerStyle
};

export { default as addImg } from './Images/add.svg';
export { default as removeImg } from './Images/remove.svg';