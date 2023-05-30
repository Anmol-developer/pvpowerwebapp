import React, {useRef,useMemo, useReducer, useEffect, useContext} from 'react'
import MyContext from '../../context/Context';
import '../../css/Map/DraggableMarker.css'
import { Marker, Popup } from 'react-leaflet'
import { ModalPopUp } from '../Modal/ModalPopUp';
import { reducer,InitialState } from '../../reducer/Reducer';

function DraggableMarker() {
    const [state,dispatch] = useReducer(reducer,InitialState);
    const draggable = true;
    const contextValue = useContext(MyContext);
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            dispatch({type:'SET_POSITION',payload: [marker.getLatLng().lat,marker.getLatLng().lng]})
          }
        }
      }),
      [state.position],
    )

    useEffect(()=>{
      // console.log(contextValue[0])
      if (contextValue[0]!==undefined) {
        dispatch({type:'SET_POSITION',payload:[contextValue[0],contextValue[1]]})
      }
    },[contextValue])
    

    // const handleClick = ()=>{
    //   console.log(state.position);
    // }

    //setting current lat , long 
    let lat,lng;
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