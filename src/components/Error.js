import React from "react";
import { useRouteError } from "react-router-dom";
import '../css/Error.css'

function Error (){
    const error = useRouteError();
    console.error(error)
    return(
        <div className="error__container">
            <p className="error__heading">OOPs!</p>
            <p className="error__subheading">An Error occured</p>
            <p className="error__info">{error.statusText || error.message}</p>
        </div>
    )
}

export {Error}