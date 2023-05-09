import { MapContainer, TileLayer } from 'react-leaflet'
// import { Marker, Popup } from 'react-leaflet'
import React from 'react'
import '../../css/Dashboard/Map.css'
import DraggableMarker from './DraggableMarker'

function Map() {
  return (
    <MapContainer className='map__container' center={[ 28.7041, 77.1025]} zoom={13} scrollWheelZoom={true} preferCanvas={true}> 
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker/>
    </MapContainer>
  )
}

export default Map