import pageStyle from "../styles/Page";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { nanoid } from "nanoid";

import * as service from "../services/service";

import { GoogleMap, useLoadScript, Marker, Polygon } from '@react-google-maps/api';
import { containerStyle, customStyles } from "../styles/ViewFlight";
//Optional include of the default css styles
//import 'react-open-weather/lib/css/ReactWeather.css';


// map options

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

const ViewFlight = () => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCj4HxBE7pnCqgYM_t4F7OnrThS8w_4hUc"
    });

    const onLoad = polygon => {
        //console.log("polygon: ", polygon)
    }

    const mapRef = useRef();

    const onMapLoad = useCallback(function callback(map) {
        mapRef.current = map;
    }, [])

    const { fid } = useParams();

    const [flight, setFlight] = useState({});
    const [drone, setDrone] = useState({ name: {}, pilots: [], tempLimits: [] });
    const [site, setSite] = useState({ pins: [], nearby_aerodromes: [], emergency_contacts: []});
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
        service
            .get_flight_details(fid)
            .then(({flight, site, drone}) => {
                setFlight(flight);
                setSite(site);
                setLat(`${site.pins[0].lat}`);
                setLng(`${site.pins[0].lng}`);
                setDrone(drone);
            })
    }, [fid]);

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

            <div style={{ color: "white", zIndex: 0 }}>
                Flight Id: {flight.fid} <br></br>
                Date: {flight.date} <br></br>
                Pilot: {flight.pilot?.join(', ')} <br></br>
                Notes: {flight.notes} <br></br><br></br>

                Droneid: {flight.drone} <br></br>
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
                        <div key={nanoid()}>
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
                {site.nearby_aerodromes.map(aerodrome => {
                    return (
                        <div key={nanoid()}>
                            name: {aerodrome.name}, distance: {aerodrome.distance}, comm: {aerodrome.comm} <br></br>
                        </div>
                    )
                })}

                <br></br>
                Emergency Contacts:

                {site.emergency_contacts.map(contact => {
                    return (
                        <div key={nanoid()}>
                            name: {contact.name}, number: {contact.number} <br></br>
                        </div>
                    )
                })}
            </div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                defaultCenter={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                zoom={7.5}
                onLoad={onMapLoad}
            >
                {(site.pins).map((marker) => (
                    <Marker
                        key={nanoid()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: "/marker.png",
                            scaledSize: new window.google.maps.Size(30, 45),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 45)
                        }}
                    />
                ))}

                {(site.pins).map(() => (
                    <Polygon
                        key={nanoid()}
                        onLoad={onLoad}
                        paths={(site.pins)}
                        options={options}
                    />
                ))}
            </GoogleMap>

            <br></br><br></br><br></br><br></br>

        </div>
    );
}

export default ViewFlight;