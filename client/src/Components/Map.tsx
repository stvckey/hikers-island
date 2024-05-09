import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";

const apiKey = process.env.API_KEY

const Map = () => {

    const apiKey: string | undefined = process.env.API_KEY;

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey || ""
    });
    
    const noMarkers: any[] = [];

    const initialMarkers = [
        {
            position: {
                lat: 28.625293,
                lng: 79.817926
            },
            label: { color: "white", text: "P2" },
            draggable: false
        },
    ];
    
    const [activeInfoWindow, setActiveInfoWindow] = useState<number | null>(null);
    const [markers, setMarkers] = useState<any[]>(initialMarkers);

    const containerStyle = {
        width: "100%",
        height: "100%",
    };

    const center = {
        lat: 33.92367193117714,
        lng: -84.00880402883644,
    };

    const mapClicked = (event: google.maps.MapMouseEvent) => {
        console.log(event.latLng.lat(), event.latLng.lng());
    };

    const markerClicked = (marker: google.maps.Marker, index: number) => {
        window.google.maps.panTo(marker.getPosition());
        setActiveInfoWindow(index);
        console.log(marker, index);
    };

    const markerDragEnd = (event: google.maps.KmlMouseEvent, index: number) => {
        console.log(event.latLng.lat(), event.latLng.lng());
    };

    return (
        isLoaded &&
        <GoogleMap
            options={{ mapId: "bd45e656986ecfd4" }}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={mapClicked}
        >
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    label={marker.label}
                    draggable={marker.draggable}
                    onDragEnd={(event) => markerDragEnd(event, index)}
                    onClick={() => markerClicked(marker, index)}
                >
                    {
                        (activeInfoWindow === index) &&
                        <InfoWindow
                            position={marker.position}
                            onCloseClick={() => setActiveInfoWindow(null)}
                        >
                            <h1>My coochie pink and my booty hole is brown</h1>
                            {/* <b>{marker.position.lat}, {marker.position.lng}</b> */}
                        </InfoWindow>
                    }
                </Marker>
            ))}
        </GoogleMap>
    );
};

export default Map;