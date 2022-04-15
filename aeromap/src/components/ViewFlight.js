import pageStyle from "../styles/pageStyle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const ViewFlight = (props) => {

    const path = props.path;
    const { fid } = useParams();
    
    const [flight, setFlight] = useState({});
    const [site, setSite] = useState({nearby_aerodromes:[], emergency_contacts:[]});

    useEffect(() => {
        fetch(`${path}get-flight/${fid}`)
          .then(res => res.json())
          .then(flight => {
            setFlight(flight)
            fetch(`${path}get-site/${flight.sitename}`)
            .then(res => res.json())
            .then(site => setSite(site))
          });
    }, []);
    
    return(
        <div style={pageStyle}>
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