import React, {useRef,useState,useMemo} from 'react'
import '../../css/Dashboard/DraggableMarker.css'
import { Marker, Popup } from 'react-leaflet'

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
    const showLatLan = ()=>{
      alert(position)
    }
  
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={showLatLan}>
            'Marker is draggable. Drag to desired location'
          </span>
        </Popup>
      </Marker>
    )
  }
  

export default DraggableMarker