import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polygon } from '@react-google-maps/api';

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
}




function MyComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCj4HxBE7pnCqgYM_t4F7OnrThS8w_4hUc"
  })

  const [inputPos, setPos] = React.useState();

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [paths, setPaths] = React.useState([]);
  const onMapClick = React.useCallback((event) => {
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



  const mapRef = React.useRef();

  const onMapLoad = React.useCallback(function callback(map) {
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

  const handleSubmit = (e) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder='Coordinates'
            value={inputPos}
            onChange={coordinateForm}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={clearMarkers}>
        <button type="submit">Clear Markers</button>
      </form>
      <form onSubmit={clearLastMarker}>
        <button type="submit">Clear Last Marker</button>
      </form>

      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={center}
        center={center}
        zoom={8}
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

        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
            <div>
              <h2>info</h2>
              <p>Lat: {selected.lat} Lng: {selected.lng} </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div >
  )
}

export default React.memo(MyComponent)
