import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import React from "react";
import "../../css/Map/Map.css";
import DraggableMarker from "./DraggableMarker";
import kashmir_json from "../../Geojson";

function Map() {
  const geoj = kashmir_json;

  // const getBorderSize = (zoom) => {
    // Calculate the desired border size based on the zoom level
    // You can adjust this calculation as per your requirements
  //   return zoom >= 10 ? 2 : 1;
  // };

  return (
    <MapContainer
      className="map__container"
      center={[28.7041, 77.1025]}
      zoom={5}
      scrollWheelZoom={true}
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={geoj}
        style={(feature) => ({
          color: "#cebfca",
          fillOpacity: 0.1,
        })}
      />
      <DraggableMarker />
    </MapContainer>
  );
}

export default Map;
