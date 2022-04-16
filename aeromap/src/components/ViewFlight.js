import pageStyle from "../styles/pageStyle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
//Optional include of the default css styles
//import 'react-open-weather/lib/css/ReactWeather.css';

const customStyles = {
	fontFamily:  'Helvetica, sans-serif',
	gradientStart:  '#000030',
	gradientMid:  '#000030',
	gradientEnd:  '#000030',
	locationFontColor:  '#FFF',
	todayTempFontColor:  '#FFF',
	todayDateFontColor:  '#B5DEF4',
	todayRangeFontColor:  '#B5DEF4',
	todayDescFontColor:  '#B5DEF4',
	todayInfoFontColor:  '#B5DEF4',
	todayIconColor:  '#FFF',
	forecastBackgroundColor:  '#FFF',
	forecastSeparatorColor:  '#DDD',
	forecastDateColor:  '#777',
	forecastDescColor:  '#777',
	forecastRangeColor:  '#777',
	forecastIconColor:  '#4BC4F7',
};

const ViewFlight = (props) => {

    const path = props.path;
    const { fid } = useParams();
    
    const [flight, setFlight] = useState({});
    const [site, setSite] = useState({nearby_aerodromes:[], emergency_contacts:[]});
    const [lat, setLat] = useState('43.6532');
    const [lng, setLng] = useState('-79.3832');

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: 'fcde36689bd38a319a0713bbd4a932ae',
        lat: lat,
        lon: lng,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });

    useEffect(() => {
        fetch(`${path}get-flight/${fid}`)
          .then(res => res.json())
          .then(flight => {
            setFlight(flight)
            fetch(`${path}get-site/${flight.sitename}`)
            .then(res => res.json())
            .then(site => {
                setSite(site)
                setLat(`${site.pins[0].lat}`);
                setLng(`${site.pins[0].lng}`);
            })
          });
    }, []);
    
    return(
        <div style={pageStyle}>
            
            <ReactWeather
                theme={customStyles}
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel={site.name}
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
            <br></br>

            <div style={{color:"white"}}>
                Flight Id: {flight.fid} <br></br>
                Date: {flight.date} <br></br>
                Drone: {flight.drone} <br></br>
                Pilot: {flight.pilot} <br></br>
                Notes: {flight.notes} <br></br><br></br>
                
                Sitename: {site.name} <br></br>
                Margin: {site.margin} <br></br>
                Class of Airspace: {site.airspace_class} <br></br>
                <br></br>

                Nearby Aerodromes:
                {console.log(typeof(site.nearby_aerodromes))}
                {site.nearby_aerodromes.map(aerodrome => {
                    return (
                        <div>
                            name: {aerodrome.name}, distance: {aerodrome.distance}, comm: {aerodrome.comm} <br></br>
                        </div>
                    )
                })}

                <br></br>
                Emergency Contacts:

                {site.emergency_contacts.map(contact => {
                    return (
                        <div>
                            name: {contact.name}, number: {contact.number} <br></br>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default ViewFlight;