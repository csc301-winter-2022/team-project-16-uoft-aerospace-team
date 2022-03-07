import { useState } from "react";

import Map from "../mapping/Map";

import pageStyle from "../styles/pageStyle";


const SitePlanner = ({create_site}) => {
    const [siteName, setSiteName] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [margin, setMargin] = useState('');

    const handleSubmit = event => {
        event.preventDefault()
        create_site(siteName, coordinates, margin);
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
        </div>
    )
}

export default SitePlanner;


