import { useState } from "react";

import Map from "../mapping/Map";

import pageStyle from "../styles/pageStyle";


const SitePlanner = (props) => {

    const path = props.path;

    const [siteName, setSiteName] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [margin, setMargin] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async event => {
        event.preventDefault()

        await fetch (`${path}create-site`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({sitename: siteName, pins: coordinates, margin: margin})
        }).then(response=>response.text())
        .then(data=>{ 
            if (data === 'success') {
                setSiteName('');
                setCoordinates('');
                setMargin('');
                setStatus('Successfully added');
            }
            else {
                setStatus('Error adding flight');
            }
        })

        setSiteName('');
        setCoordinates('');
        setMargin('');
    }

    return (
        <div style={pageStyle}>
            <form onSubmit={handleSubmit}>
                <input value={siteName} placeholder='Site Name' onChange={({target}) => setSiteName(target.value)} />
                <input value={coordinates} placeholder='Coordinates' onChange={({target}) => setCoordinates(target.value)} />
                <input value={margin} placeholder='Margin' onChange={({target}) => setMargin(target.value)} />
                <button>submit</button>
            </form>
            <Map />
            <div>{status}</div>
        </div>
    )
}

export default SitePlanner;


