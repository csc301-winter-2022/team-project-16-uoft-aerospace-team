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
    const [drone, setDrone] = useState({name:{}, pilots:[], tempLimits:[]});
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
            fetch(`${path}get-drone/${flight.drone}`)
            .then(res => res.json())
            .then(drone => {
                setDrone(drone)
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
                Pilot: {flight.pilot} <br></br>
                Notes: {flight.notes} <br></br><br></br>
                
                Droneid: {flight.drone} <br></br>
                {console.log(drone)}
                Full Name: {drone.name.fullName}<br></br>
                Short Name: {drone.name.shortName}<br></br>
                Version Number: {drone.name.versionNum}<br></br>
                MTWO: {drone.MTOW}<br></br>
                Type: {drone.type}<br></br>
                Endurance: {drone.endurance}<br></br>
                Range: {drone.range}<br></br>
                Temperature Limits: min {drone.tempLimits[0]}; max {drone.tempLimits[1]}<br></br>
                Maximum Airspeed: {drone.maxAirspeed}<br></br><br></br>
                Pilots:<br></br>
                {drone.pilots.map(pilot => {
                    return (
                        <div>
                            {pilot} <br></br>
                        </div>
                    )
                })}
                <br></br>
                Build Date: {drone.buildDate}<br></br>
                Flight Cycles: {drone.flightCycles}<br></br>
                lastMaintenance: {drone.lastMaintenance}<br></br><br></br>

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

            <br></br><br></br><br></br><br></br>

        </div>
    );
}

export default ViewFlight;