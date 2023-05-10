import React, {useRef,useState,useMemo} from 'react'
import '../../css/Dashboard/DraggableMarker.css'
import { Marker, Popup } from 'react-leaflet'
import { ModalPopUp } from './Modal/ModalPopUp';

function DraggableMarker() {
  
    const draggable = true;
    const [position, setPosition] = useState([ 28.7041, 77.1025])
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        }
      }),
      [position],
    )
    
    //just for test run whether it is showing lat and lon or not
    // const showLatLan = ()=>{
    //   console.log(position)
    // }

    //setting current lat , long 
    let lat,lng;
    position.lat ? (lat=position.lat) : (lat = position[0])
    position.lng ? (lng=position.lng) : (lng = position[1])
  
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        >
        <Popup minWidth={90}>
          <span>
            'Marker is draggable. Drag to desired location'<br/>
            <ModalPopUp lat={lat} lon={lng}/>
          </span>
        </Popup>
      </Marker>
    )
  }
  

export default DraggableMarker