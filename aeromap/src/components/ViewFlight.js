

import pageStyle from "../styles/pageStyle";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';

import { GoogleMap, useLoadScript, Marker, Polygon } from '@react-google-maps/api';
//Optional include of the default css styles
//import 'react-open-weather/lib/css/ReactWeather.css';


// map options

const containerStyle = {
    width: '300px',
    height: '300px'
};

const options = {
    fillColor: "lightblue",
    fillOpacity: 0.1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
};




const customStyles = {
    fontFamily: 'Helvetica, sans-serif',
    gradientStart: '#000030',
    gradientMid: '#000030',
    gradientEnd: '#000030',
    locationFontColor: '#FFF',
    todayTempFontColor: '#FFF',
    todayDateFontColor: '#B5DEF4',
    todayRangeFontColor: '#B5DEF4',
    todayDescFontColor: '#B5DEF4',
    todayInfoFontColor: '#B5DEF4',
    todayIconColor: '#FFF',
    forecastBackgroundColor: '#FFF',
    forecastSeparatorColor: '#DDD',
    forecastDateColor: '#777',
    forecastDescColor: '#777',
    forecastRangeColor: '#777',
    forecastIconColor: '#4BC4F7',
};

const ViewFlight = (props) => {

    // map things
    const [siteName, setSiteName] = useState('');
    const [margin, setMargin] = useState('');
    const [markers, setMarkers] = useState([]);
    const [paths, setPaths] = useState([]);


    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCj4HxBE7pnCqgYM_t4F7OnrThS8w_4hUc"
    });

    const onLoad = polygon => {
        console.log("polygon: ", polygon)
    }

    const mapRef = useRef();

    const onMapLoad = useCallback(function callback(map) {
        mapRef.current = map;
    }, [])



    const path = props.path;
    const { fid } = useParams();

    const [flight, setFlight] = useState({});
    const [site, setSite] = useState({ nearby_aerodromes: [], emergency_contacts: [] });
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
                        setMarkers(`${site.pins}`);
                        setPaths(`${site.polygon}`);
                    })
            });
    }, []);

    if (loadError) return "Error loading map";
    if (!isLoaded) return "loading maps";

    return (
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

            <div style={{ color: "white" }}>
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
                {console.log(typeof (site.nearby_aerodromes))}
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
            <GoogleMap
                mapContainerStyle={containerStyle}
                defaultCenter={{ lat: lat, lng: lng }}
                center={{ lat: lat, lng: lng }}
                zoom={8}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}

                    />
                ))}

                {paths.map(() => (
                    <Polygon
                        onLoad={onLoad}
                        paths={paths}
                        options={options}
                    />
                ))}
            </GoogleMap>

        </div>
    );
}

export default ViewFlight;