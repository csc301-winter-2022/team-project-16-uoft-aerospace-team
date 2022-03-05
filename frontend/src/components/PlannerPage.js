import pageStyle from "../styles/pageStyle";

import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import { compose, withStateHandlers } from 'recompose';


const Map = compose(
    withStateHandlers(() => ({
    }), {
        mapClick: ({ isMarkerShown }) => (map) => ({
            markerPosition: map.latLng,
            isMarkerShown: true
        })
    }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={9}
            defaultCenter={{ lat: 43.6609, lng: -79.3960 }}
            onClick={props.mapClick}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} />}

        </GoogleMap>
    )

class PlannerPage extends React.Component {
    render() {
        return (
            <div style={pageStyle}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCj4HxBE7pnCqgYM_t4F7OnrThS8w_4hUc"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}

export default PlannerPage;


