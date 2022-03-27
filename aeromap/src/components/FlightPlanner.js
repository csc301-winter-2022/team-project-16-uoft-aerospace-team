import { useState } from "react";
import {flightPlannerTitleStyle, dividerStyle} from "../styles/flightPlannerStyle";
import pageStyle from "../styles/pageStyle";

const FlightPlanner = ({create_flight}) => {
    const [time, setTime] = useState('');
    const [siteName, setSiteName] = useState('');
    const [pilotName, setPilotName] = useState('');
    const [droneInfo, setDroneInfo] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        create_flight(time, siteName, pilotName, droneInfo, notes);
        setTime('');
        setSiteName('');
        setPilotName('');
        setDroneInfo('');
        setNotes('');
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

        </div>
    );
}

export default FlightPlanner;