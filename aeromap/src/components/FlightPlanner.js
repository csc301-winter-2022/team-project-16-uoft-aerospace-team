import { useEffect, useState } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import Select from 'react-select';
import CustomButton from "./widgets/CustomButton";
import CustomAlert from "./widgets/CustomAlert";
import StyledTextField from "./widgets/StyledTextField";
import Header from "./widgets/Header";
import Moment from "moment";

import * as service from "../services/service";

import {
    inputStyle, formStyle, containerStyle,
    textStyle, selectWrapperStyle, addImg, 
    removeImg, imgStyle, pilotsContainerStyle,
    initialPilotContainerStyle, removeContainerStyle,
    textAreaStyle, buttonContainerStyle,
} from "../styles/FlightPlanner";
import pageStyle from "../styles/Page";

const FlightPlanner = () => {

    const [droneOptions, setDroneOptions] = useState([]);
    const [siteOptions, setSiteOptions] = useState([]);
    const [time, setTime] = useState(new Date());
    const [site, setSite] = useState('');
    const [drone, setDrone] = useState('');
    const [pilots, setPilots] = useState(['']);
    const [notes, setNotes] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        service
            .get_sites()
            .then(sites => {
                const options = sites.map(site => ({ value: site.name, label: site.name }))
                setSiteOptions(options)
            })

        service
            .get_drones()
            .then(drones => {
                const options = drones.map(drone => ({ value: drone.droneid, label: drone.name.shortName }))
                setDroneOptions(options)
            })
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        if (!(time && site && drone) || pilots.includes('')) {
            setAlertType('warning')
            setAlertMessage('Missing field values, time, site, drone, and pilot names must be included.')
            setAlert(true)
            return
        } else if (!Moment(time).isValid()) {
            setAlertType('warning')
            setAlertMessage('Malformatted time')
            setAlert(true)
            return
        }
        
        service
            .create_flight(time, site, pilots, drone, notes)
            .then(() => {
                    setAlertType('success')
                    setAlertMessage('Submission Successful, Flight Saved.')
                    setAlert(true)
                })
            .catch(() => {
                setAlertType('error')
                setAlertMessage('Server Error, Flight Could Not Be Saved.')
                setAlert(true)
                })            
    }

    const handleChange = setInput => ({ target }) => setInput(target.value);

    const handleAddPilot = () => setPilots(pilots.concat(''))

    const handleRemovePilot = index => () => {
        const reducedPilotsList = pilots.slice(0, index).concat(pilots.slice(index + 1))
        setPilots(reducedPilotsList)
    }

    const handleNameChange = index => ({ target }) => {
        const nameChangedPilotsList = pilots.slice(0, index).concat(target.value).concat(pilots.slice(index + 1))
        setPilots(nameChangedPilotsList)
    }

    const generatePilots = () => {
        let index = 0
        return pilots.slice(1).map(() => {
            index++
            return (
                <div style={pilotsContainerStyle} key={index}>
                    <StyledTextField
                        label={`Pilot ${index + 1}`}
                        variant="outlined"
                        value={pilots[index]}
                        onChange={handleNameChange(index)}
                    />
                    <div style={removeContainerStyle} onClick={handleRemovePilot(index)}>
                        <img src={removeImg} style={imgStyle} alt='Remove Pilot' />
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={pageStyle}>
            <Header text='Schedule Flight' />

            <div style={formStyle}>

                <div style={containerStyle}>
                    <div style={textStyle}>Schedule Flight Time:</div>
                    <Datetime
                        onChange={setTime}
                        value={time}
                        inputProps={{ style: inputStyle }}
                        dateFormat='YYYY-MM-DD'
                        timeFormat='ha'
                    />
                </div>

                <div style={containerStyle}>
                    <div style={textStyle}>Select Site:</div>
                    <div style={selectWrapperStyle}>
                        <Select
                            options={siteOptions}
                            placeholder='Select Site...'
                            onChange={selected => setSite(selected.value)}
                            //https://stackoverflow.com/questions/55830799/how-to-change-zindex-in-react-select-drowpdown
                            menuPortalTarget={document.body} 
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </div>
                </div>

                <div style={containerStyle}>
                    <div style={textStyle}>Select Drone:</div>
                    <div style={selectWrapperStyle}>
                        <Select
                            options={droneOptions}
                            placeholder='Select Drone...'
                            onChange={selected => setDrone(selected.value)}

                            menuPortalTarget={document.body} 
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        />
                    </div>
                </div>

                <div style={containerStyle}>
                    <div style={textStyle}>Pilots:</div>
                    <div onClick={handleAddPilot}><img src={addImg} style={imgStyle} alt='Add Pilot' /></div>
                </div>

                <div style={initialPilotContainerStyle}>
                    <StyledTextField
                        label='Pilot 1'
                        variant="outlined"
                        value={pilots[0]}
                        onChange={handleNameChange(0)} />
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

            <CustomAlert type={alertType} message={alertMessage} alert={alert} setAlert={setAlert} />

        </div>
    );
}

export default FlightPlanner;