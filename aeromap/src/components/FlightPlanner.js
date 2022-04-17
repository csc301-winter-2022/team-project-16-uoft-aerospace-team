import { useEffect, useState, forwardRef } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import CustomButton from "./customButton";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {
    flightPlannerTitleStyle, dividerStyle, inputStyle, 
    formStyle, containerStyle, textStyle, selectWrapperStyle,
    addImg, removeImg, imgStyle, pilotsContainerStyle, initialPilotContainerStyle, removeContainerStyle, textAreaStyle, buttonContainerStyle,
} from "../styles/flightPlannerStyle";
import pageStyle from "../styles/pageStyle";

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`& .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    [`&:hover .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    [`& .${inputLabelClasses.outlined}`]: {
      color: "white"
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
      color: "white"
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
      color: "white"
    }
});

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const FlightPlanner = (props) => {
    
    const path = props.path
    
    const [siteOptions, setSiteOptions] = useState([]);
    const [time, setTime] = useState(new Date());
    const [site, setSite] = useState('');
    const [drone, setDrone] = useState('');
    const [pilots, setPilots] = useState(['']);
    const [notes, setNotes] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        fetch(`${path}get-sites`)
            .then(res => res.json())
            .then(sites => {
                const options = sites.map(site => ({ value: site.name, label: site.name }))
                setSiteOptions(options)
            })
      }, []);
    
    const handleSubmit = event => {
        event.preventDefault();

        if (!(time && site && drone) || pilots.find(name => name === '')) {
            setAlertType('warning')
            setAlert(true)
            return
        }

        fetch (`${path}create-flight`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: time, sitename: site, pilot: pilots, drone: drone, notes: notes})
        })
        .then(response=>response.text())
        .then(data=>{ 
            if (data === 'success') {
                setTime('');
                setSite('');
                setPilots([]);
                setDrone('');
                setNotes('');
                setAlertType('success')
                setAlert(true)
            }
            else {
                setAlertType('error')
                setAlert(true)
            }
        })
    }

    const handleChange = setInput => ({target}) => setInput(target.value);

    const handleAddPilot = () => setPilots(pilots.concat(''))

    const handleRemovePilot = index => () => {
        const reducedPilotsList = pilots.slice(0, index).concat(pilots.slice(index + 1))
        setPilots(reducedPilotsList)
    }

    const handleNameChange = index => ({target}) => {
        const nameChangedPilotsList = pilots.slice(0, index).concat(target.value).concat(pilots.slice(index + 1))
        setPilots(nameChangedPilotsList)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return

        setAlert(false);
    }

    const generatePilots = () => {
        let index = 0
        return pilots.slice(1).map(() => {
            index++
            return(
                <div style={pilotsContainerStyle} key={index}>
                    <StyledTextField 
                        label={`Pilot ${index + 1}`} 
                        variant="outlined"
                        value={pilots[index]}
                        onChange={handleNameChange(index)}
                        />
                    <div style={removeContainerStyle} onClick={handleRemovePilot(index)}>
                        <img src={removeImg} style={imgStyle} alt='Remove Pilot'/>
                    </div>
                </div>
            )
        })
    }

    const generateAlert = type => {
        if (type === 'success') {
            return (
                <Snackbar 
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                    open={alert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Submission Successful, Flight Saved.
                    </Alert>
                </Snackbar>
            )
        } else if (type === 'warning') {
            return (
                <Snackbar 
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                    open={alert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Missing field values, must input time, site, drone, and pilot names. 
                    </Alert>
                </Snackbar>
            )
        } else if (type === 'Error') {
            return(
                <Snackbar 
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                    open={alert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Server Error, Flight Could Not Be Saved.
                    </Alert>
                </Snackbar>
            )
        } else {
            return null
        }

    }

    return(
        <div style={pageStyle}> 
            <div style={flightPlannerTitleStyle}>
                <strong>
                    Schedule Flight
                </strong>
            </div>

            <hr style={dividerStyle} />

            <div style={formStyle}>

                <div style={containerStyle}>
                    <div style={textStyle}>Schedule Flight Time:</div>
                    <Datetime onChange={setTime} value={time} inputProps={{style: inputStyle}}/>
                </div>

                <div style={containerStyle}>
                    <div style={textStyle}>Select Site:</div>
                    <div style={selectWrapperStyle}>
                        <Select
                            options={siteOptions}
                            placeholder='Select Site...'
                            onChange={selected => setSite(selected.value)}
                        />
                    </div>
                </div>

                <div style={containerStyle}>
                    <div style={textStyle}>Select Drone:</div>
                    <div style={selectWrapperStyle}>
                        <Select
                            placeholder='Select Drone...'
                        />
                    </div>
                </div>

                <div style={containerStyle}>
                    <div style={textStyle}>Pilots:</div>
                    <div onClick={handleAddPilot}><img src={addImg} style={imgStyle} alt='Add Pilot'/></div>
                </div>

                <div style={initialPilotContainerStyle}>
                    <StyledTextField 
                        label='Pilot 1' 
                        variant="outlined"
                        value={pilots[0]}
                        onChange={handleNameChange(0)}/>
                </div>

                {generatePilots()}
            
                <div style={containerStyle}>
                    <div style={textStyle}>Notes:</div>
                </div>

                <div style={containerStyle}>
                <textarea
                        style={textAreaStyle}
                        value={notes}
                        onChange={handleChange(setNotes)}
                        />
                </div>

                <div style={buttonContainerStyle} >
                    <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                </div>
            </div>

            {generateAlert(alertType)}

        </div>
    );
}

export default FlightPlanner;