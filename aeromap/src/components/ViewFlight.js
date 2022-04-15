import pageStyle from "../styles/pageStyle";
import React, {useState} from 'react';
import { useParams } from "react-router-dom";


const ViewFlight = (props) => {

    const path = props.path;
    const { fid } = useParams();

    const [flight, setFlight] = useState([]);
    const [site, setSite] = useState([]);

    const get_flight = async () => {
        await fetch(`${path}get-flight/${fid}`)
        .then(res => res.json())
        .then(data => {
            setFlight(JSON.parse(data));
            get_site(flight.sitename)
        })
    }

    const get_site = async (sitename) => {
        await fetch(`${path}get-site/${sitename}`)
        .then(res => res.json())
        .then(data => {
            setSite(data);
        })
    }
    
    get_flight();
    
    return(
        <div style={pageStyle}>
            Flight Id: {flight.fid} <br></br>
            Date: {flight.date} <br></br>
            Drone: {flight.drone} <br></br>
            Notes: {flight.notes} <br></br><br></br>
            
            Sitename: {site.sitename} <br></br>
            Margin: {site.margin} <br></br>
            Class of Airspace: {site.airspace_class} <br></br>
            Nearby Aerodromes:





            Emergency Contacts:




        </div>
    );
}

export default ViewFlight;