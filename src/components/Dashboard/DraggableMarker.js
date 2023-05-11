import React, {useRef,useState,useMemo, useReducer} from 'react'
import '../../css/Dashboard/DraggableMarker.css'
import { Marker, Popup } from 'react-leaflet'
import { ModalPopUp } from './Modal/ModalPopUp';
import { reducer,InitialState } from '../../reducer/Reducer';

function DraggableMarker() {
    const [state,dispatch] = useReducer(reducer,InitialState);
    const draggable = true;
    // const [position, setPosition] = useState([ 28.7041, 77.1025])
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            // console.log(marker.getLatLng().lng)
            dispatch({type:'SET_POSITION',payload: [marker.getLatLng().lat,marker.getLatLng().lng]})
          }
        }
      }),
      [state.position],
    )

    //setting current lat , long 
    let lat,lng;
    // state.position.lat ? (lat=state.position.lat) : (lat = state.position[0])
    // state.position.lng ? (lng=state.position.lng) : (lng = state.position[1])
    lat = state.position[0]
    lng = state.position[1]
  
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={state.position}
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