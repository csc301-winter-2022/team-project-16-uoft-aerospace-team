import { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, Polygon } from '@react-google-maps/api';
import CustomAlert from "./widgets/CustomAlert";

import * as service from "../services/service";

import pageStyle from "../styles/Page";

const containerStyle = {
  width: '1000px',
  height: '750px',
  zIndex: 0
};

const center = {
  lat: 43.653225,
  lng: -79.383186
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

const buttonStyle = {
  backgroundColor: "#4CAF50",
  border: "2px black",
  color: "white",
  padding: "3px",
  width: "180px",
  height: "25px"
}

const AddSite = () => {

  const [siteName, setSiteName] = useState('');
  const [margin, setMargin] = useState('');
  const [markers, setMarkers] = useState([]);
  const [info, setInfo] = useState([]);
  const [airspace, setAirspace] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    if (markers.length < 3) {
      setAlertType('warning');
      setAlertMessage('Invalid area');
      setAlert(true)
      return
    } else if (siteName === '' || margin === '') {
      setAlertType('warning');
      setAlertMessage('Missing field values: site name and margin must have values.');
      setAlert(true)
      return
    }

    service
      .create_site(siteName, markers, margin)
      .then(data => {
        if (data === 'success') {
          setSiteName('');
          setMargin('');
          setAlertType('success');
          setAlertMessage('Successfully added');
          setAlert(true)
        }
        else {
          setAlertType('error');
          setAlertMessage('Error adding flight');
          setAlert(true)
        }
      })

    setSiteName('');
    setMargin('');
  }

  // Map related code

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCj4HxBE7pnCqgYM_t4F7OnrThS8w_4hUc"
  });

  const [inputPos, setPos] = useState();

  const onMapClick = useCallback((event) => {

    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      },
    ]);

  }, [])

  const fetchInfo = (e) => {
    e.preventDefault()
    service
      .get_aerodronmes(markers)
      .then(data => setInfo(data))

    fetch(`http://localhost:3001/api/get-airspace/${markers[markers.length - 1].lat}/${markers[markers.length - 1].lng}`)
      .then(res => res.json())
      .then(data => setAirspace(data));
  }

  const mapRef = useRef();

  const onMapLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, [])

  const onLoad = polygon => {
    console.log("polygon: ", polygon)
  }

  function clearMarkers(e) {
    e.preventDefault();
    setMarkers([]);
    setInfo([])
    setAirspace('');
  }

  function clearLastMarker(e) {
    e.preventDefault();
    setMarkers(markers.slice(0, -1));
  }

  const coordinateForm = (e) => {
    setPos(e.target.value);
  }

  const handleAddMarker = (e) => {
    e.preventDefault();
    const input = inputPos.split(',');
    if (input.length === 2 && !isNaN(parseFloat(input[0])) && !isNaN(parseFloat(input[1]))) {
      const inputLat = parseFloat(inputPos.split(',')[0]);
      const inputLong = parseFloat(inputPos.split(',')[1]);
      setMarkers(
        [...markers,
        {
          lat: inputLat,
          lng: inputLong,
          time: new Date()
        },
        ]);
    }

  }

  if (loadError) return "Error loading map";
  if (!isLoaded) return "loading maps";

  return (
    <div style={pageStyle}>

      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 155,
          left: 188,
          opacity: .75,
          padding: "5px",
          backgroundColor: "white",
          width: "180px", // or you can use width: any_number
          height: "475px" // or you can use height: any_number
        }}
      >
      </div>

      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 155,
          left: 188,
          opacity: 1,
          padding: "5px",
          wordBreak: "break-word",
          width: "180px", // or you can use width: any_number
          height: "400px" // or you can use height: any_number
        }}
      >
        <form onSubmit={handleAddMarker}>
          <label>
            <input
              style={{
                width: "176px",
                height: "20px",
                border: "none",
              }}
              type="text"
              placeholder='Lat, Long'
              value={inputPos}
              onChange={coordinateForm}
            />
          </label>
          <input style={buttonStyle} type="submit" value="Add Marker" />
        </form>
        <form onSubmit={clearMarkers}>
          <button
            style={buttonStyle}
            type="submit">
            Clear Markers
          </button>
        </form>
        <form onSubmit={clearLastMarker}>
          <button
            style={buttonStyle}
            type="submit">
            Clear Last Marker
          </button>
        </form>
        <form onSubmit={fetchInfo}>
          <button
            style={buttonStyle}
            type="submit">
            Show Local Data
          </button>
        </form>
        {airspace !== '' ? <div style={{ padding: "", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14}}>Class of Airspace: {airspace}</div> : null}
        {info.map((aerodrome) => (
          <div style={{ padding: "", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14 }}><br></br>{aerodrome.name.replace(/['"]+/g, '')}<br></br>{aerodrome.distance.toFixed(2)}km</div>
        ))}
        <br></br>

      </div>

      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 560,
          left: 188,
          opacity: 1,
          padding: "5px",
          wordBreak: "break-word",
          width: "180px", // or you can use width: any_number
        }}
      >
        <form onSubmit={handleSubmit}>
          <input style={{
            width: "176px",
            height: "20px",
            border: "none",
          }}
            value={siteName} placeholder='Site Name' onChange={({ target }) => setSiteName(target.value)} />
          <input style={{
            width: "176px",
            height: "20px",
            border: "none",
          }}
            value={margin} placeholder='Margin' onChange={({ target }) => setMargin(target.value)} />
          <button style={buttonStyle} >Submit</button>
        </form>
      </div>



      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={center}
        center={center}
        zoom={7}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >



        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/marker.png",
              scaledSize: new window.google.maps.Size(30, 45),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 45)
            }}
          />
        ))}

        {markers.map(() => (
          <Polygon
            onLoad={onLoad}
            paths={markers}
            options={options}
          />
        ))}

      </GoogleMap>


      <CustomAlert type={alertType} message={alertMessage} alert={alert} setAlert={setAlert} />
    </div>
  );
}

export default AddSite;