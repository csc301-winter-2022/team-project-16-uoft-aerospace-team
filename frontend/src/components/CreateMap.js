function createMap() {
    const myLatlng = { lat: 43.6532, lng: -79.3832 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: myLatlng,
    });
    let infoWindow = new google.maps.InfoWindow({
        position: myLatlng,
    });

    map.addListener("click", (mapsMouseEvent) => {
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });
}