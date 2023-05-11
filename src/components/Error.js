import React from "react";
import { useRouteError } from "react-router-dom";
import '../css/Error.css'

function Error (){
    const error = useRouteError();
    console.error(error)
    return(
        <div className="error__container">
            <h1>OOPs!</h1>
            <p>An Error occured</p>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}

export {Error}