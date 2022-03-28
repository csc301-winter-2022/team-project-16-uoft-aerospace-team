import { useState } from "react";
import {flightPlannerTitleStyle, dividerStyle} from "../styles/flightPlannerStyle";
import pageStyle from "../styles/pageStyle";

const FlightPlanner = (props) => {
    
    const path = props.path
    
    const [time, setTime] = useState('');
    const [siteName, setSiteName] = useState('');
    const [pilotName, setPilotName] = useState('');
    const [droneInfo, setDroneInfo] = useState('');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        await fetch (`${path}create-flight`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: time, sitename: siteName, pilot: pilotName, drone: droneInfo, notes: notes})
        }).then(response=>response.text())
        .then(data=>{ 
            if (data === 'success') {
                setTime('');
                setSiteName('');
                setPilotName('');
                setDroneInfo('');
                setNotes('');
                setStatus('Successfully added');
            }
            else {
                setStatus('Error adding flight');
            }
        })
    }

    const handleChange = setInput => ({target}) => setInput(target.value);

    return(
        <div style={pageStyle}> 
            <div style={flightPlannerTitleStyle}>
                <strong>
                    <em>Add Flight</em>
                </strong>
            </div>

            <hr style={dividerStyle} />

            <form onSubmit={handleSubmit}>
                <input type="datetime-local" value={time} onChange={handleChange(setTime)}/>
                <input value={siteName} placeholder='Site Name' onChange={handleChange(setSiteName)}/>
                <input value={pilotName} placeholder='Pilot Name' onChange={handleChange(setPilotName)}/>
                <input value={droneInfo} placeholder='Drone Info' onChange={handleChange(setDroneInfo)}/>
                <input value={notes} placeholder='Notes' onChange={handleChange(setNotes)}/>
                <button>submit</button>
            </form>

            <div>{status}</div>

        </div>
    );
}

export default FlightPlanner;