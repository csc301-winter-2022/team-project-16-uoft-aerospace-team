import { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, Polygon } from '@react-google-maps/api';

import pageStyle from "../styles/pageStyle";

const containerStyle = {
  width: '900px',
  height: '700px'
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



const AddSite = (props) => {

  const path = props.path;

  const [siteName, setSiteName] = useState('');
  const [margin, setMargin] = useState('');
  const [markers, setMarkers] = useState([]);
  const [status, setStatus] = useState('');

  const handleSubmit = async event => {
    event.preventDefault()

    console.log(markers);

    await fetch(`${path}create-site`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sitename: siteName, pins: markers, margin: margin })
    }).then(response => response.text())
      .then(data => {
        if (data === 'success') {
          setSiteName('');
          setMargin('');
          setStatus('Successfully added');
        }
        else {
          setStatus('Error adding flight');
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
  const [selected, setSelected] = useState(null);
  const [paths, setPaths] = useState([]);

  const onMapClick = useCallback((event) => {
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      },
    ]);
    setPaths(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ]);
  }, [])

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
    setPaths([]);
  }

  function clearLastMarker(e) {
    e.preventDefault();
    setMarkers(markers.slice(0, -1));
    setPaths(paths.slice(0, -1));
  }

  const coordinateForm = (e) => {
    setPos(e.target.value);
  }

  const handleAddMarker = (e) => {
    e.preventDefault();
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
    setPaths(
      [...paths,
      {
        lat: inputLat,
        lng: inputLong
      }]
    )
  }

  if (loadError) return "Error loading map";
  if (!isLoaded) return "loading maps";

  return (
    <div style={pageStyle}>

      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 120,
          left: 188,
          opacity: .75,
          padding: "5px",
          backgroundColor: "white",
          width: "180px", // or you can use width: any_number
          height: "500px" // or you can use height: any_number
        }}
      >
      </div>

      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 120,
          left: 188,
          opacity: 1,
          padding: "5px",
          wordBreak: "break-word",
          width: "180px", // or you can use width: any_number
          height: "500px" // or you can use height: any_number
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
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={center}
        center={center}
        zoom={8}
        onLoad={onMapLoad}
        onClick={onMapClick}
        zIndex={0}
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
            onCLick={() => {
              setSelected(marker);
            }}
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

      <form onSubmit={handleSubmit}>
        <input value={siteName} placeholder='Site Name' onChange={({ target }) => setSiteName(target.value)} />
        <input value={margin} placeholder='Margin' onChange={({ target }) => setMargin(target.value)} />
        <button>submit</button>
      </form>
      <div>{status}</div>
    </div>
  );
}

export default AddSite;