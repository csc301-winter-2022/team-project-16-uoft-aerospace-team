import { useState } from "react";

const FlightPlanner = ({create_flight}) => {
    const [time, setTime] = useState('');
    const [siteName, setSiteName] = useState('');
    const [pilotName, setPilotName] = useState('');
    const [droneInfo, setDroneInfo] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        create_flight(siteName, pilotName, droneInfo, notes);
        setTime('');
        setSiteName('');
        setPilotName('');
        setDroneInfo('');
        setNotes('');
    }

    const handleChange = setInput => ({target}) => setInput(target.value);

    return(
        <div> 
            <h1>Add Flight</h1>

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